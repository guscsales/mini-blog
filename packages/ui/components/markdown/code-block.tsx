import type { Components } from "hast-util-to-jsx-runtime";

import "./code-block.css";

/**
 * O bloco de código do Paper: cabeçalho com o caminho do arquivo e a
 * linguagem, números de linha à esquerda e uma linha destacada com barra
 * verde. A marcação vem do rehype-pretty-code:
 *
 * - `figure[data-rehype-pretty-code-figure]` envolve tudo
 * - `figcaption[data-rehype-pretty-code-title]` traz o `title="..."`
 * - cada linha é um `span[data-line]`, e a destacada ganha `data-highlighted-line`
 *
 * Os números saem de um contador CSS, então nada disso custa JavaScript no
 * cliente — o realce já aconteceu na build.
 */

/** O shiki usa a abreviação da linguagem; o rótulo do Paper usa o nome cheio. */
const LANGUAGE_LABELS: Record<string, string> = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  sh: "bash",
  md: "markdown",
};

/** Chevrons do cabeçalho. */
function CodeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden>
      <path
        d="M6 3.5L2.5 8 6 12.5M10 3.5L13.5 8 10 12.5"
        fill="none"
        stroke="var(--color-text-muted)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const codeBlockComponents: Components = {
  figure: ({ children, ...props }) => {
    const isCode = "data-rehype-pretty-code-figure" in props;

    if (!isCode) {
      return <figure {...props}>{children}</figure>;
    }

    return (
      <figure
        className="code-block overflow-clip rounded-md border border-border bg-code-bg"
        {...props}
      >
        {children}
      </figure>
    );
  },

  figcaption: ({ children, ...props }) => {
    const raw = props["data-language" as keyof typeof props] as string | undefined;
    const language = raw ? (LANGUAGE_LABELS[raw] ?? raw) : undefined;

    return (
      <figcaption
        className="flex items-center justify-between border-b border-border bg-surface px-4 py-3"
        {...props}
      >
        <span className="flex items-center gap-[10px] font-mono text-xs leading-4 text-text-muted">
          <CodeIcon />
          {children}
        </span>
        {language ? (
          <span className="font-mono text-[11px] leading-[14px] tracking-wide text-text-muted uppercase">
            {language}
          </span>
        ) : null}
      </figcaption>
    );
  },

  pre: ({ children, ...props }) => (
    <pre
      className="overflow-x-auto py-4 font-mono text-sm leading-6 [&>code]:block [&>code]:w-fit [&>code]:min-w-full [&>code]:pr-4"
      {...props}
    >
      {children}
    </pre>
  ),
};
