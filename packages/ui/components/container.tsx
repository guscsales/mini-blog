/**
 * Faixa de conteúdo do site. O respiro lateral fica por fora, então o conteúdo
 * trava exatamente em 1120px (--container-wide) — a medida do artboard de
 * desktop, que é 1440 menos as margens de 160.
 */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="px-5 lg:px-10">
      <div className={`mx-auto w-full max-w-wide ${className ?? ""}`}>{children}</div>
    </div>
  );
}
