import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

import { compileMarkdown } from "../../../factories/services/markdown";
import { codeBlockComponents } from "./code-block";
import { proseComponents } from "./prose-components";

/**
 * Renderiza markdown do `.cms` com o visual do blog.
 *
 * Roda inteiro no servidor: o pipeline do remark e o realce de sintaxe
 * acontecem na build, e o cliente recebe só o HTML já pronto.
 */
export async function Markdown({ source }: { source: string }) {
  const tree = await compileMarkdown(source);

  return (
    <div className="flex flex-col gap-6 lg:gap-7">
      {toJsxRuntime(tree, {
        Fragment,
        jsx,
        jsxs,
        components: { ...proseComponents, ...codeBlockComponents },
      })}
    </div>
  );
}
