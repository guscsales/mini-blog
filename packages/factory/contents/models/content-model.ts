import { CONTENT_STATUS } from "../constants/content-constants";

export type ContentStatus =
	(typeof CONTENT_STATUS)[keyof typeof CONTENT_STATUS];

/** A content as described by its markdown frontmatter — no body. */
export interface Content {
	slug: string;
	title: string;
	description: string | null;
	publishedAt: Date;
	status: ContentStatus;
	tags: string[];
	author: string | null;
	/** Estimated reading time of the body, in whole minutes (never below 1). */
	readingTimeInMinutes: number;
}

/** A content with everything the detail screen needs. */
export interface ContentDetail extends Content {
	/** The markdown body, frontmatter already stripped. */
	body: string;
}

export interface ListContentsOptions {
	/** Keep only contents with this status. Defaults to `published`. Pass `null` for every status. */
	status?: ContentStatus | null;
	/** Cap the number of contents returned. */
	limit?: number;
}

export interface GetContentBySlugOptions {
	/** Keep only a content with this status. Defaults to `published`. Pass `null` for every status. */
	status?: ContentStatus | null;
}

/** Thrown when a markdown file has broken or missing frontmatter. */
export class InvalidContentError extends Error {
	constructor(slug: string, reason: string) {
		super(`Invalid content "${slug}": ${reason}`);
		this.name = "InvalidContentError";
	}
}
