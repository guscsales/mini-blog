/** Contêiner padrão de página: largura máxima, respiro lateral e ritmo vertical. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-wide flex-col gap-16 px-6 py-16">
      {children}
    </main>
  );
}
