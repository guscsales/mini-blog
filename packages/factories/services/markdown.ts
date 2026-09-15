import {
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import type { Root } from "hast";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { createHighlighter, type Highlighter } from "shiki";
import { unified } from "unified";

import { codeTheme } from "./code-theme";

/** Linguagens que os posts usam. Carregar só estas mantém a build enxuta. */
const LANGUAGES = [
  "typescript",
  "tsx",
  "javascript",
  "jsx",
  "json",
  "bash",
  "css",
  "html",
  "markdown",
];

let highlighter: Promise<Highlighter> | null = null;

/**
 * O highlighter é caro de montar, então é criado uma vez e reaproveitado por
 * todas as páginas da build. O tema é nosso, então precisa ser registrado na
 * mão — o shiki só conhece os que vêm no bundle dele.
 */
function getHighlighter(): Promise<Highlighter> {
  highlighter ??= createHighlighter({ themes: [codeTheme], langs: LANGUAGES });
  return highlighter;
}

/**
 * Markdown do `.cms` vira árvore HTML (hast). Fica em `factories` porque é o
 * pipeline de conteúdo; quem transforma isso em React é `packages/ui`.
 *
 * O GFM entra para tabela, tarefa, texto riscado e nota de rodapé. O realce de
 * sintaxe roda aqui, na build, para o cliente não baixar highlighter nenhum.
 */
export async function compileMarkdown(source: string): Promise<Root> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: codeTheme,
      // o fundo vem do nosso token, não do tema
      keepBackground: false,
      // o <code> vira grid: sem isso, a quebra de linha "\n" que sobra entre
      // cada span de linha some do document flow, mas ainda ocupa uma linha
      // inteira — dobrando o espaço entre linhas de código.
      grid: true,
      // sem isso, `código inline` vira um bloco fake do rehype-pretty-code
      bypassInlineCode: true,
      defaultLang: "text",
      getHighlighter,
      transformers: [
        // linha inteira: comentário `// [!code highlight]`, além do `{n}` do
        // próprio meta da cerca (`data-highlighted-line`, já suportado nativamente)
        transformerNotationHighlight(),
        // palavra: `[!code word:nome]` pinta toda ocorrência de "nome" na linha
        transformerNotationWordHighlight(),
      ],
    });

  const mdast = processor.parse(source);
  return (await processor.run(mdast)) as Root;
}
