import path from "node:path";

/** Folder where every content markdown file lives, relative to the repo root. */
export const CMS_DIRECTORY_NAME = ".cms";

/** Absolute path to the CMS folder. */
export const CMS_DIRECTORY_PATH = path.join(process.cwd(), CMS_DIRECTORY_NAME);

/** Only files with this extension are treated as contents. */
export const CONTENT_FILE_EXTENSION = ".md";

export const CONTENT_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

/** Status assumed when the markdown frontmatter omits `status`. */
export const DEFAULT_CONTENT_STATUS = CONTENT_STATUS.PUBLISHED;

/** Average reading speed used to estimate how long a content takes to read. */
export const WORDS_READ_PER_MINUTE = 200;
