import type { Components } from "hast-util-to-jsx-runtime";

/**
 * O visual de cada elemento do markdown, seguindo o bloco "Prose" do Paper.
 * Os tamanhos crescem em `lg`: o artboard mobile usa 16/27 no corpo e o de
 * desktop, 17/28 — que é o par de tokens `--text-base` / `--leading-relaxed`.
 */

const BODY = "font-sans text-base leading-[27px] text-text lg:leading-relaxed";

/** Marca a lista de tarefas, que o GFM entrega como `<ul class="contains-task-list">`. */
function isTaskList(className?: string) {
  return Boolean(className?.includes("contains-task-list"));
}

export const proseComponents: Components = {
  p: ({ children, ...props }) => (
    <p className={BODY} {...props}>
      {children}
    </p>
  ),

  h2: ({ children, ...props }) => (
    <h2
      className="pt-3 font-display text-[30px] leading-[114%] tracking-tight text-text lg:pt-5 lg:text-[38px]"
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3
      className="pt-2 font-display text-[23px] leading-[120%] tracking-tight text-text lg:text-[26px]"
      {...props}
    >
      {children}
    </h3>
  ),

  strong: ({ children, ...props }) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),

  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),

  del: ({ children, ...props }) => (
    <del className="text-[#66705F] line-through decoration-1" {...props}>
      {children}
    </del>
  ),

  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="border-b border-[#35603F] text-accent"
      {...props}
    >
      {children}
    </a>
  ),

  /**
   * O mesmo `<code>` serve para trecho solto e para bloco. Dentro de um `<pre>`
   * o realce já pintou tudo, então aqui só o trecho solto ganha a pílula verde.
   */
  code: ({ children, className, ...props }) => {
    // o <code> de bloco vem do rehype-pretty-code com data-language/data-theme,
    // nunca com className — é isso que diferencia dos dois casos, não o contrário.
    const isBlock = "data-language" in props;

    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code
        className="rounded-xs bg-accent-dim px-[6px] py-px font-mono text-[13px] leading-4 text-accent"
        {...props}
      >
        {children}
      </code>
    );
  },

  ul: ({ children, className, ...props }) =>
    isTaskList(className) ? (
      <ul className="flex flex-col gap-3" {...props}>
        {children}
      </ul>
    ) : (
      <ul className="flex flex-col gap-[10px]" {...props}>
        {children}
      </ul>
    ),

  ol: ({ children, ...props }) => (
    <ol className="flex list-none flex-col gap-[10px] [counter-reset:item]" {...props}>
      {children}
    </ol>
  ),

  /**
   * Um `<li>` cobre três casos: item de lista com marcador redondo, item
   * numerado com o número em mono e item de tarefa com caixa de seleção. O que
   * decide é o conteúdo que o GFM entregou.
   */
  li: ({ children, className, ...props }) => {
    const isTask = Boolean(className?.includes("task-list-item"));
    const footnote = /^user-content-fn-(.+)$/.exec(String(props.id ?? ""));

    if (footnote) {
      return (
        <li className="flex items-start gap-[10px]" {...props}>
          <span className="w-[26px] shrink-0 font-mono text-[11px] leading-[21px] text-accent">
            [{footnote[1]}]
          </span>
          <span className="grow">{children}</span>
        </li>
      );
    }

    if (isTask) {
      return (
        <li className="flex items-center gap-[10px]" {...props}>
          {children}
        </li>
      );
    }

    return (
      <li
        className="flex items-start gap-3 before:mt-[10px] before:size-[6px] before:shrink-0 before:rounded-full before:bg-accent before:content-[''] [ol_&]:before:mt-0 [ol_&]:before:w-[22px] [ol_&]:before:rounded-none [ol_&]:before:bg-transparent [ol_&]:before:text-right [ol_&]:before:font-mono [ol_&]:before:text-sm [ol_&]:before:leading-[26px] [ol_&]:before:text-accent [ol_&]:before:[counter-increment:item] [ol_&]:before:[content:counter(item)'.']"
        {...props}
      >
        <span className="grow font-sans text-base leading-[26px] text-text">
          {children}
        </span>
      </li>
    );
  },

  /** A caixa da tarefa é desenhada; o input do GFM fica só como estado. */
  input: ({ checked, ...props }) =>
    props.type === "checkbox" ? (
      <span
        role="checkbox"
        aria-checked={Boolean(checked)}
        className={
          checked
            ? "flex size-[18px] shrink-0 items-center justify-center rounded-xs bg-accent"
            : "size-[18px] shrink-0 rounded-xs border-[1.5px] border-border-strong"
        }
      >
        {checked ? (
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path
              d="M2.5 6.2l2.3 2.3 4.7-5"
              fill="none"
              stroke="#07130B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
    ) : null,

  blockquote: ({ children, ...props }) => (
    <blockquote className="flex gap-4" {...props}>
      <div className="w-[3px] shrink-0 rounded-full bg-accent" />
      <div className="flex grow flex-col gap-[6px] lg:gap-2 [&_p]:font-display [&_p]:text-[21px] [&_p]:leading-[140%] [&_p]:tracking-normal [&_p]:text-text [&_p]:italic [&_p:last-child]:font-mono [&_p:last-child]:text-[11px] [&_p:last-child]:leading-[14px] [&_p:last-child]:tracking-[0.08em] [&_p:last-child]:text-text-muted [&_p:last-child]:not-italic [&_p:only-child]:font-display [&_p:only-child]:text-[21px] [&_p:only-child]:leading-[140%] [&_p:only-child]:text-text [&_p:only-child]:italic">
        {children}
      </div>
    </blockquote>
  ),

  hr: (props) => <hr className="mt-2 h-px border-0 bg-border lg:mt-4" {...props} />,

  table: ({ children, ...props }) => (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead className="bg-surface" {...props}>
      {children}
    </thead>
  ),

  th: ({ children, ...props }) => (
    <th
      className="border-b border-border-strong px-2 py-[11px] text-left font-mono text-[10px] leading-3 font-medium tracking-[0.1em] text-text-muted uppercase first:px-[14px]"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td
      className="border-b border-border px-2 py-[11px] font-sans text-sm leading-[18px] text-text-muted first:px-[14px] last:font-medium last:text-accent [tr:last-child_&]:border-b-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-text"
      {...props}
    >
      {children}
    </td>
  ),

  /** Notas de rodapé do GFM: a seção inteira e cada item. */
  section: ({ children, className, ...props }) =>
    className?.includes("footnotes") ? (
      <section
        className="flex flex-col gap-[10px] [&_a[data-footnote-backref]]:hidden [&_h2]:sr-only [&_li]:flex [&_li]:items-start [&_li]:gap-[10px] [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-[10px] [&_p]:font-sans [&_p]:text-[13px] [&_p]:leading-[21px] [&_p]:text-text-muted"
        {...props}
      >
        {children}
      </section>
    ) : (
      <section className={className} {...props}>
        {children}
      </section>
    ),

  sup: ({ children, ...props }) => (
    <sup className="font-mono text-[11px] text-accent" {...props}>
      {children}
    </sup>
  ),
};
