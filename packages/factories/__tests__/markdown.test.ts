import { describe, expect, it } from "bun:test";
import { toHtml } from "hast-util-to-html";

import { compileMarkdown } from "../services/markdown";

/** Compila e devolve HTML só pra facilitar asserção por substring nos testes. */
async function render(source: string): Promise<string> {
  const tree = await compileMarkdown(source);
  return toHtml(tree);
}

describe("compileMarkdown", () => {
  it("marca negrito, itálico e riscado", async () => {
    const html = await render("Cobre **negrito**, *itálico* e ~~riscado~~.");
    expect(html).toContain("<strong>negrito</strong>");
    expect(html).toContain("<em>itálico</em>");
    expect(html).toContain("<del>riscado</del>");
  });

  it("marca código inline sem tocar em bloco de código", async () => {
    const html = await render("Cobre `código inline`.");
    expect(html).toContain("<code>código inline</code>");
  });

  it("vira lista de tarefa GFM com estado marcado", async () => {
    const html = await render("- [x] feito\n- [ ] a fazer");
    expect(html).toContain('class="contains-task-list"');
    expect(html).toContain("checked");
  });

  it("vira tabela GFM", async () => {
    const html = await render("| A | B |\n| --- | --- |\n| 1 | 2 |");
    expect(html).toContain("<table>");
    expect(html).toContain("<th>A</th>");
  });

  it("vira nota de rodapé GFM", async () => {
    const html = await render("Texto.[^1]\n\n[^1]: A nota.");
    expect(html).toContain("data-footnotes");
    expect(html).toContain("A nota.");
  });

  it("realça bloco de código com o tema do projeto", async () => {
    const html = await render('```ts\nconst x = 1\n```');
    expect(html).toContain("data-rehype-pretty-code-figure");
    expect(html).toContain("data-language=\"ts\"");
    // cor de palavra-chave do tema
    expect(html).toContain("color:#7CFF9B");
  });

  it("marca a linha do meta `{n}` da cerca", async () => {
    const html = await render('```ts {1}\nconst x = 1\n```');
    expect(html).toContain("data-highlighted-line");
  });

  it("marca linha com o comentário // [!code highlight]", async () => {
    const html = await render(
      "```ts\nconst a = 1 // [!code highlight]\nconst b = 2\n```",
    );
    expect(html).toContain('class="highlighted"');
  });

  it("marca palavra com [!code word:nome]", async () => {
    const html = await render(
      "```ts\nconst slug = 1 // [!code word:slug]\n```",
    );
    expect(html).toContain('class="highlighted-word"');
  });

  it("numera linha quando a cerca pede showLineNumbers", async () => {
    const html = await render('```ts showLineNumbers\nconst x = 1\n```');
    expect(html).toContain("data-line-numbers");
  });

  it("lê o título da cerca em title=\"...\"", async () => {
    const html = await render('```ts title="lib/posts.ts"\nconst x = 1\n```');
    expect(html).toContain("lib/posts.ts");
  });
});
