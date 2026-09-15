import { fontWeightTokens, leadingTokens, trackingTokens } from "../../tokens";
import { TokenTile } from "../token-preview";

/** Pesos disponíveis, aplicados à mesma palavra. */
export function FontWeights() {
  return (
    <div>
      {fontWeightTokens.map((token) => (
        <TokenTile key={token.name} token={token}>
          <p className="text-xl" style={{ fontWeight: `var(${token.name})` }}>
            Aa Bb Cc
          </p>
        </TokenTile>
      ))}
    </div>
  );
}

/** Espaçamento entre letras. */
export function Trackings() {
  return (
    <div>
      {trackingTokens.map((token) => (
        <TokenTile key={token.name} token={token}>
          <p className="text-xl" style={{ letterSpacing: `var(${token.name})` }}>
            Aa Bb Cc
          </p>
        </TokenTile>
      ))}
    </div>
  );
}

/** Entrelinhas, em duas linhas para dar pra enxergar a diferença. */
export function Leadings() {
  return (
    <div>
      {leadingTokens.map((token) => (
        <TokenTile key={token.name} token={token}>
          <p style={{ lineHeight: `var(${token.name})` }}>
            Duas linhas de exemplo para enxergar a entrelinha aplicada.
          </p>
        </TokenTile>
      ))}
    </div>
  );
}
