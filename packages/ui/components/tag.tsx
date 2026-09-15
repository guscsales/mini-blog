/** Categoria do post, em verde sobre o accent escurecido. */
export function Tag({
  children,
  size = "sm",
}: {
  children: React.ReactNode;
  /** `sm` nos cards, `md` no destaque e nos filtros. */
  size?: "sm" | "md";
}) {
  const sizeClass =
    size === "sm"
      ? "px-[9px] py-1 text-[11px] leading-[14px]"
      : "px-[10px] py-[5px] text-xs leading-4";

  return (
    <span className={`rounded-xs bg-accent-dim font-mono font-medium text-accent ${sizeClass}`}>
      {children}
    </span>
  );
}

/** Selo sólido sobre a capa — o destaque da listagem. */
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-accent px-[10px] py-[5px] font-mono text-[11px] leading-[14px] font-semibold tracking-[0.08em] text-[#07130B] uppercase lg:px-3 lg:py-[6px] lg:tracking-[0.1em]">
      {children}
    </span>
  );
}
