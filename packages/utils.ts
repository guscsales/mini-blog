/** Shared utility helpers. Agnostic: no React, Next or browser APIs. */

const publishedAtFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  // Frontmatter dates are parsed as UTC midnight, so format them in UTC to
  // avoid rendering the previous day in negative offsets.
  timeZone: "UTC",
});

export function formatPublishedAt(date: Date): string {
  return publishedAtFormatter.format(date);
}

export function toDateTimeAttribute(date: Date): string {
  return date.toISOString().slice(0, 10);
}
