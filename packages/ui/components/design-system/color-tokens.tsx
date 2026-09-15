import { colorTokens } from "../../tokens";
import { ColorSwatch } from "../token-preview";

/** Grade com uma amostra por token de cor. */
export function ColorTokens() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {colorTokens.map((token) => (
        <ColorSwatch key={token.name} token={token} />
      ))}
    </div>
  );
}
