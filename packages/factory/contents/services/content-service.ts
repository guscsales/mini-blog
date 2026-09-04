import fs from "node:fs/promises";
import path from "node:path";

import {
  CMS_DIRECTORY_PATH,
  CONTENT_FILE_EXTENSION,
  DEFAULT_CONTENT_STATUS,
} from "../constants/content-constants";
import { toContent, toContentDetail } from "../mappers/content-mapper";
import type {
  Content,
  ContentDetail,
  GetContentBySlugOptions,
  ListContentsOptions,
} from "../models/content-model";

function toSlug(fileName: string): string {
  return path.basename(fileName, CONTENT_FILE_EXTENSION);
}

function toFilePath(slug: string): string {
  return path.join(CMS_DIRECTORY_PATH, `${slug}${CONTENT_FILE_EXTENSION}`);
}

/** Guards against `../` escaping the CMS folder through a route param. */
function isSafeSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug);
}

/** Newest first — the ordering the whole site relies on. */
function byPublishedAtDesc(a: Content, b: Content): number {
  return b.publishedAt.getTime() - a.publishedAt.getTime();
}

async function readContentFile(slug: string): Promise<ContentDetail | null> {
  try {
    const rawFile = await fs.readFile(toFilePath(slug), "utf-8");
    return toContentDetail(slug, rawFile);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

/** Every slug available in the CMS folder, unordered. */
export async function listContentSlugs(): Promise<string[]> {
  let fileNames: string[];

  try {
    fileNames = await fs.readdir(CMS_DIRECTORY_PATH);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  return fileNames
    .filter((fileName) => fileName.endsWith(CONTENT_FILE_EXTENSION))
    .map(toSlug);
}

/** Contents without their body, newest first. Published only, unless told otherwise. */
export async function listContents(
  options: ListContentsOptions = {},
): Promise<Content[]> {
  const { status = DEFAULT_CONTENT_STATUS, limit } = options;

  const slugs = await listContentSlugs();
  const details = await Promise.all(slugs.map(readContentFile));

  const contents = details
    .filter((detail): detail is ContentDetail => detail !== null)
    .map(toContent)
    .filter((content) => status === null || content.status === status)
    .sort(byPublishedAtDesc);

  return limit === undefined ? contents : contents.slice(0, limit);
}

/** A single content with its markdown body, or `null` when the slug has no file. */
export async function getContentBySlug(
  slug: string,
  options: GetContentBySlugOptions = {},
): Promise<ContentDetail | null> {
  const { status = DEFAULT_CONTENT_STATUS } = options;

  if (!isSafeSlug(slug)) return null;

  const content = await readContentFile(slug);
  if (!content) return null;
  if (status !== null && content.status !== status) return null;

  return content;
}
