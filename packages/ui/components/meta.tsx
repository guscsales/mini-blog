/** Linha mono em caixa alta usada para data, categoria e rótulos de seção. */
export function Meta({
  children,
  tracking = "wide",
  className,
}: {
  children: React.ReactNode;
  /** `wide` na data do post, `wider` no rótulo que abre uma seção. */
  tracking?: "wide" | "wider";
  className?: string;
}) {
  const trackingClass = tracking === "wide" ? "tracking-[0.1em]" : "tracking-[0.14em]";

  return (
    <p
      className={`font-mono text-[11px] leading-[14px] uppercase ${trackingClass} ${className ?? "text-text-muted"}`}
    >
      {children}
    </p>
  );
}
