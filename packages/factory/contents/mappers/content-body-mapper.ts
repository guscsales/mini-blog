import type { Element, Root } from "hast";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
};

/** Wraps every `<table>` in a scrollable container, so wide tables don't break the layout. */
function rehypeWrapTables() {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "table" || !parent || index === undefined) return;

      const wrapper: Element = {
        type: "element",
        tagName: "div",
        properties: { className: ["table-scroll"] },
        children: [node],
      };

      parent.children[index] = wrapper;
    });
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypePrettyCode, prettyCodeOptions)
  .use(rehypeWrapTables)
  .use(rehypeStringify);

/**
 * Renders the markdown body as HTML.
 *
 * The `.cms` folder is authored and versioned by us, so the markdown is trusted
 * and the output is not sanitized.
 */
export async function toContentBodyHtml(body: string): Promise<string> {
  const file = await processor.process(body);
  return String(file);
}
