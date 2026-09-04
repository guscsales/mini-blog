import matter from "gray-matter";

import {
  CONTENT_STATUS,
  DEFAULT_CONTENT_STATUS,
  WORDS_READ_PER_MINUTE,
} from "../constants/content-constants";
import {
  InvalidContentError,
  type Content,
  type ContentDetail,
  type ContentStatus,
} from "../models/content-model";

function toStatus(slug: string, value: unknown): ContentStatus {
  if (value === undefined || value === null) return DEFAULT_CONTENT_STATUS;

  const statuses = Object.values(CONTENT_STATUS) as string[];
  if (typeof value !== "string" || !statuses.includes(value)) {
    throw new InvalidContentError(
      slug,
      `"status" must be one of ${statuses.join(" | ")}`,
    );
  }

  return value as ContentStatus;
}

function toPublishedAt(slug: string, value: unknown): Date {
  if (!value) {
    throw new InvalidContentError(slug, '"publishedAt" is required');
  }

  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    throw new InvalidContentError(slug, '"publishedAt" is not a valid date');
  }

  return date;
}

function toTags(slug: string, value: unknown): string[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) {
    throw new InvalidContentError(slug, '"tags" must be a list');
  }

  return value.map(String);
}

function toOptionalString(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toReadingTimeInMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_READ_PER_MINUTE));
}

/** Turns the raw markdown file into a content with its body. */
export function toContentDetail(slug: string, rawFile: string): ContentDetail {
  const { data, content } = matter(rawFile);
  const frontmatter = data as Record<string, unknown>;

  const title = toOptionalString(frontmatter.title);
  if (!title) {
    throw new InvalidContentError(slug, '"title" is required');
  }

  const body = content.trim();

  return {
    slug,
    title,
    description: toOptionalString(frontmatter.description),
    publishedAt: toPublishedAt(slug, frontmatter.publishedAt),
    status: toStatus(slug, frontmatter.status),
    tags: toTags(slug, frontmatter.tags),
    author: toOptionalString(frontmatter.author),
    readingTimeInMinutes: toReadingTimeInMinutes(body),
    body,
  };
}

/** Drops the body — the listing screen never needs it. */
export function toContent(content: ContentDetail): Content {
  return {
    slug: content.slug,
    title: content.title,
    description: content.description,
    publishedAt: content.publishedAt,
    status: content.status,
    tags: content.tags,
    author: content.author,
    readingTimeInMinutes: content.readingTimeInMinutes,
  };
}
