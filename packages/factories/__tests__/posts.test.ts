import { describe, expect, it } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  getFeaturedPost,
  getPosts,
  getPostsSummary,
} from "../services/posts";

const publicDir = join(import.meta.dir, "..", "..", "..", "public");

describe("serviço de posts", () => {
  it("entrega um destaque com tempo de leitura", () => {
    const featured = getFeaturedPost();
    expect(featured.slug).toBeTruthy();
    expect(featured.readingTime).toBeTruthy();
  });

  it("entrega a listagem sem slug repetido", () => {
    const slugs = getPosts().map((post) => post.slug);
    expect(slugs.length).toBeGreaterThan(0);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("aponta só para capas que existem em public/", () => {
    const covers = [getFeaturedPost(), ...getPosts()].map((post) => post.cover);
    const missing = covers.filter((cover) => !existsSync(join(publicDir, cover)));

    expect(missing).toEqual([]);
  });

  it("dá texto alternativo para toda capa", () => {
    const semAlt = [getFeaturedPost(), ...getPosts()].filter(
      (post) => !post.coverAlt.trim(),
    );

    expect(semAlt).toEqual([]);
  });

  it("resume a listagem com total e data", () => {
    const summary = getPostsSummary();
    expect(summary.total).toBeGreaterThan(0);
    expect(summary.updatedLabel).toBeTruthy();
  });
});
