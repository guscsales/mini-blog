/** Categoria do post, em verde sobre o accent escurecido, ou só contornada. */
export function Tag({
  children,
  size = "sm",
  variant = "solid",
}: {
  children: React.ReactNode;
  /** `sm` nos cards, `md` no destaque e nos filtros. */
  size?: "sm" | "md";
  /** `solid` é a categoria principal; `outline`, as demais tags do post. */
  variant?: "solid" | "outline";
}) {
  const sizeClass =
    size === "sm"
      ? "px-[9px] py-1 text-[11px] leading-[14px]"
      : "px-[10px] py-[5px] text-xs leading-4";

  const variantClass =
    variant === "solid"
      ? "bg-accent-dim font-medium text-accent"
      : "border border-border-strong font-normal text-text-muted";

  return (
    <span className={`rounded-xs font-mono ${sizeClass} ${variantClass}`}>{children}</span>
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
