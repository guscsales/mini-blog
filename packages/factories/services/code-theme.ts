import type { ThemeRegistrationRaw } from "shiki";

/** Regras de cor por escopo do TextMate. */
const tokenColors = [
  {
    scope: ["comment", "punctuation.definition.comment"],
    settings: { foreground: "#71806F", fontStyle: "italic" },
  },
  {
    scope: [
      "keyword",
      "storage",
      "storage.type",
      "storage.modifier",
      "keyword.control",
      "keyword.operator.new",
      "keyword.operator.expression",
      "variable.language",
      "constant.language",
      "support.type.primitive",
    ],
    settings: { foreground: "#7CFF9B" },
  },
  {
    scope: ["string", "string.quoted", "string.template", "constant.other.symbol"],
    settings: { foreground: "#C3E88D" },
  },
  {
    scope: ["constant.numeric", "constant.language.boolean"],
    settings: { foreground: "#C3E88D" },
  },
  {
    scope: ["entity.name.function", "support.function", "meta.function-call"],
    settings: { foreground: "#E6EAE6" },
  },
  {
    scope: ["variable", "variable.other", "meta.definition.variable", "entity.name.type"],
    settings: { foreground: "#E6EAE6" },
  },
  {
    scope: ["punctuation", "meta.brace", "keyword.operator"],
    settings: { foreground: "#8A948B" },
  },
  {
    scope: ["entity.name.tag"],
    settings: { foreground: "#7CFF9B" },
  },
  {
    scope: ["entity.other.attribute-name"],
    settings: { foreground: "#C3E88D" },
  },
];

/**
 * Tema de sintaxe do mini-blog, com as cores que o bloco de código usa no
 * layout do Paper: verde fósforo nas palavras-chave, verde-limão nas strings e
 * cinza esverdeado nos comentários.
 *
 * As regras aparecem sob dois nomes de propósito: o shiki lê `settings`, e é
 * por `tokenColors` que o rehype-pretty-code reconhece um tema passado como
 * objeto em vez de nome.
 */
export const codeTheme: ThemeRegistrationRaw & { tokenColors: typeof tokenColors } = {
  name: "mini-blog",
  type: "dark",
  colors: {
    "editor.background": "#0E110E",
    "editor.foreground": "#E6EAE6",
  },
  settings: tokenColors,
  tokenColors,
};
