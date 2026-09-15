import { fontFamilyTokens, fontSizeTokens } from "../../tokens";
import { TokenRow } from "../token-preview";

/** Amostra de como os estilos aparecem num post real. */
export function TypeSpecimen() {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-display text-4xl leading-tight tracking-tight">
        A arte de não fazer nada
      </p>
      <p className="font-display text-3xl leading-tight tracking-tight">
        Título de post na listagem
      </p>
      <p className="font-display text-2xl leading-tight tracking-tight">
        Subtítulo dentro do artigo
      </p>
      <p className="max-w-prose text-base leading-relaxed">
        O corpo do artigo usa Inter em 17px com entrelinha de 28px. Medida de
        linha travada em 680px para leitura longa confortável.
      </p>
      <p className="font-mono text-xs tracking-wide text-accent uppercase">
        12 mai 2026 · 8 min de leitura
      </p>
      <code className="rounded-sm bg-code-bg px-3 py-2 font-mono text-sm text-text-muted">
        const posts = await getPosts()
      </code>
    </div>
  );
}

/** Cada degrau da escala tipográfica, com o tamanho aplicado ao lado. */
export function TypeScale() {
  return (
    <div>
      {fontSizeTokens.map((token) => (
        <TokenRow key={token.name} token={token}>
          <p
            className="font-display truncate leading-tight tracking-tight"
            style={{ fontSize: `var(${token.name})` }}
          >
            Aa
          </p>
        </TokenRow>
      ))}
    </div>
  );
}

/** As três famílias, cada uma com a mesma frase para comparar. */
export function FontFamilies() {
  return (
    <div>
      {fontFamilyTokens.map((token) => (
        <TokenRow key={token.name} token={token}>
          <p className="text-lg" style={{ fontFamily: `var(${token.name})` }}>
            Programação web com Next.js e bun
          </p>
        </TokenRow>
      ))}
    </div>
  );
}
