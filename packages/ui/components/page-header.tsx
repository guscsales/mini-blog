/** Cabeçalho de página: sobrelinha mono, marca/título e um texto de apoio. */
export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  /** Marca ou título. O texto acessível vai no `srTitle`. */
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4">
      <p className="font-mono text-xs tracking-wide text-accent uppercase">
        {eyebrow}
      </p>
      {title}
      {children ? (
        <div className="max-w-prose text-lg text-text-muted">{children}</div>
      ) : null}
    </header>
  );
}
