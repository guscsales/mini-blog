import { describe, expect, it } from "bun:test";
import { Glob } from "bun";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const componentsDir = join(import.meta.dir, "..");

const componentFiles = [...new Glob("**/*.tsx").scanSync(componentsDir)].filter(
  (file) => !file.startsWith("__tests__/"),
);

describe("componentes de packages/ui", () => {
  it("encontra os componentes na pasta", () => {
    expect(componentFiles.length).toBeGreaterThan(0);
  });

  it("não monta página completa — isso é papel do app", () => {
    // `<main>` e `metadata` só existem nas rotas do Next, em `app/`.
    // A única exceção é o PageShell, que é justamente o contêiner que a rota usa.
    const offenders = componentFiles.filter((file) => {
      if (file === "page-shell.tsx") return false;
      const source = readFileSync(join(componentsDir, file), "utf8");
      return source.includes("<main") || source.includes("export const metadata");
    });

    expect(offenders).toEqual([]);
  });

  it("não importa nada de dentro de app/", () => {
    const offenders = componentFiles.filter((file) =>
      /from\s+"@?\/?\.*\/?app\//.test(readFileSync(join(componentsDir, file), "utf8")),
    );

    expect(offenders).toEqual([]);
  });
});
