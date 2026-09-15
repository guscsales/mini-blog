/** Seção com rótulo mono em caixa alta. Usada para separar blocos de uma página. */
export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="mb-6 font-mono text-xs tracking-wide text-text-muted uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
