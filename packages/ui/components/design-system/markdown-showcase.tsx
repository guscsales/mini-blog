import { Markdown } from "../markdown/markdown";

/**
 * Todas as variações de markdown que o Paper define, renderizadas pelo mesmo
 * caminho que um post de verdade vai usar: arquivo do `.cms` → remark → React.
 */
export async function MarkdownShowcase({ source }: { source: string }) {
  return (
    <div className="max-w-prose rounded-md border border-border bg-bg p-5 lg:p-8">
      <Markdown source={source} />
    </div>
  );
}
