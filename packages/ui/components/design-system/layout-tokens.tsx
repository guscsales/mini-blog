import {
  breakpointTokens,
  containerTokens,
  radiusTokens,
  spacingTokens,
} from "../../tokens";
import { TokenBar, TokenRow } from "../token-preview";

/** Escala de espaçamento, com uma barra proporcional a cada valor. */
export function SpacingTokens() {
  return (
    <div>
      {spacingTokens.map((token) => (
        <TokenRow key={token.name} token={token}>
          <TokenBar token={token} />
        </TokenRow>
      ))}
    </div>
  );
}

/** Raios de canto aplicados a um quadrado. */
export function RadiusTokens() {
  return (
    <div className="flex flex-wrap gap-6">
      {radiusTokens.map((token) => (
        <div key={token.name} className="flex flex-col gap-2">
          <div
            className="size-24 border border-border-strong bg-surface"
            style={{ borderRadius: `var(${token.name})` }}
          />
          <p className="font-mono text-xs text-text-muted">{token.name}</p>
        </div>
      ))}
    </div>
  );
}

/** Breakpoints e larguras de contêiner, lado a lado. */
export function LayoutTokens() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        {breakpointTokens.map((token) => (
          <TokenRow key={token.name} token={token} />
        ))}
      </div>
      <div>
        {containerTokens.map((token) => (
          <TokenRow key={token.name} token={token} />
        ))}
      </div>
    </div>
  );
}
