import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const uiDir = join(import.meta.dir, "..", "..");
const svg = readFileSync(join(uiDir, "assets", "logo.svg"), "utf8");
const component = readFileSync(join(uiDir, "components", "logo.tsx"), "utf8");

/** Extrai os `d="..."` na ordem em que aparecem. */
function paths(source: string): string[] {
  return [...source.matchAll(/ d="([^"]+)"/g)].map((match) => match[1]);
}

describe("logo", () => {
  it("desenha o wordmark em paths, sem depender da fonte", () => {
    expect(svg).not.toContain("<text");
    expect(component).not.toContain("<text");
    expect(paths(svg).length).toBeGreaterThan(0);
  });

  it("mantém o componente e o arquivo .svg com o mesmo desenho", () => {
    expect(paths(component)).toEqual(paths(svg));
  });

  it("usa a mesma viewBox nos dois", () => {
    const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1].split(" ");
    expect(viewBox).toBeDefined();

    const width = component.match(/const WIDTH = ([\d.]+);/)?.[1];
    const height = component.match(/const HEIGHT = ([\d.]+);/)?.[1];
    expect([width, height]).toEqual([viewBox![2], viewBox![3]]);
  });

  it("pinta o hífen com o accent e a palavra com currentColor", () => {
    expect(svg).toContain('fill="#7cff9b"');
    expect(svg).toContain('fill="#e6eae6"');
    expect(component).toContain('className="fill-current"');
    expect(component).toContain('accentClassName = "fill-accent"');
  });

  it("expõe rótulo acessível e modo decorativo", () => {
    expect(svg).toContain('aria-label="mini-blog"');
    expect(component).toContain("decorative");
  });
});
