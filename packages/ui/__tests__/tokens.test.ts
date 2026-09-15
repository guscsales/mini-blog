import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { allTokens, fontFamilyTokens, tokenGroups } from "../tokens";

const css = readFileSync(join(import.meta.dir, "..", "globals.css"), "utf8");

/** Lê `--nome: valor;` do bloco @theme do design system. */
function readCssToken(name: string): string | null {
  const match = css.match(new RegExp(`${name}:\\s*([^;]+);`));
  return match ? match[1].trim() : null;
}

describe("tokens do design system", () => {
  it("declara todo token do TypeScript dentro do globals.css", () => {
    const missing = allTokens
      .map((token) => token.name)
      .filter((name) => readCssToken(name) === null);

    expect(missing).toEqual([]);
  });

  it("mantém os valores do TypeScript iguais aos do CSS", () => {
    // Famílias ficam de fora: no CSS elas apontam para as variáveis do next/font.
    const families = new Set(fontFamilyTokens.map((token) => token.name));

    const divergent = allTokens
      .filter((token) => !families.has(token.name))
      .filter((token) => readCssToken(token.name)?.toLowerCase() !== token.value.toLowerCase())
      .map((token) => token.name);

    expect(divergent).toEqual([]);
  });

  it("aponta cada família para a variável do next/font e para o fallback", () => {
    for (const token of fontFamilyTokens) {
      const value = readCssToken(token.name);
      expect(value).toContain("var(--font-");
      expect(value).toContain(token.value);
    }
  });

  it("não repete token entre grupos", () => {
    const names = allTokens.map((token) => token.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("expõe todos os grupos com ao menos um token", () => {
    for (const group of tokenGroups) {
      expect(group.tokens.length).toBeGreaterThan(0);
    }
  });
});
