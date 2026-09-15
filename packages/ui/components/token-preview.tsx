import type { Token } from "../tokens";

/** Amostra visual de um token de cor. */
export function ColorSwatch({ token }: { token: Token }) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface">
      <div className="h-24 w-full" style={{ backgroundColor: `var(${token.name})` }} />
      <div className="border-t border-border px-4 py-3">
        <p className="font-mono text-xs text-accent">{token.name}</p>
        <p className="font-mono text-xs text-text-muted">{token.value}</p>
      </div>
    </div>
  );
}

/** Linha "nome → valor" usada nas seções não visuais. */
export function TokenRow({ token, children }: { token: Token; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline gap-4 border-b border-border py-3 last:border-b-0">
      <p className="w-56 shrink-0 font-mono text-xs text-text-muted">{token.name}</p>
      <p className="w-20 shrink-0 font-mono text-xs text-accent">{token.value}</p>
      {children ? <div className="min-w-0 flex-1">{children}</div> : null}
    </div>
  );
}

/** Barra proporcional ao valor — usada em espaçamento. */
export function TokenBar({ token }: { token: Token }) {
  return (
    <div
      className="h-3 rounded-xs bg-accent-dim ring-1 ring-accent/40"
      style={{ width: `var(${token.name})` }}
    />
  );
}

/** Bloco vertical: cabeçalho com nome/valor e a amostra abaixo em largura cheia. */
export function TokenTile({ token, children }: { token: Token; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-border py-4 last:border-b-0">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-xs text-text-muted">{token.name}</p>
        <p className="font-mono text-xs text-accent">{token.value}</p>
      </div>
      {children}
    </div>
  );
}
