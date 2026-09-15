/**
 * Espelho em TypeScript dos tokens definidos em `packages/ui/globals.css`.
 * Serve para telas de documentação do Design System — nunca para estilizar:
 * componentes usam as classes/variáveis do Tailwind, não estes valores.
 */

export type Token = {
  name: string;
  value: string;
};

export type TokenGroup = {
  id: string;
  title: string;
  tokens: Token[];
};

export const colorTokens: Token[] = [
  { name: "--color-bg", value: "#0a0b0a" },
  { name: "--color-surface", value: "#121412" },
  { name: "--color-surface-hover", value: "#181c18" },
  { name: "--color-border", value: "#20241f" },
  { name: "--color-border-strong", value: "#2e342d" },
  { name: "--color-text", value: "#e6eae6" },
  { name: "--color-text-muted", value: "#8a948b" },
  { name: "--color-accent", value: "#7cff9b" },
  { name: "--color-accent-dim", value: "#1b3324" },
  { name: "--color-code-bg", value: "#0e110e" },
];

export const fontSizeTokens: Token[] = [
  { name: "--text-xs", value: "12px" },
  { name: "--text-sm", value: "14px" },
  { name: "--text-base", value: "17px" },
  { name: "--text-lg", value: "20px" },
  { name: "--text-xl", value: "24px" },
  { name: "--text-2xl", value: "32px" },
  { name: "--text-3xl", value: "40px" },
  { name: "--text-4xl", value: "56px" },
  { name: "--text-5xl", value: "72px" },
];

export const fontFamilyTokens: Token[] = [
  { name: "--font-display", value: "Instrument Serif" },
  { name: "--font-sans", value: "Inter" },
  { name: "--font-mono", value: "JetBrains Mono" },
];

export const fontWeightTokens: Token[] = [
  { name: "--font-weight-normal", value: "400" },
  { name: "--font-weight-medium", value: "500" },
  { name: "--font-weight-semibold", value: "600" },
];

export const trackingTokens: Token[] = [
  { name: "--tracking-tight", value: "-0.02em" },
  { name: "--tracking-normal", value: "0em" },
  { name: "--tracking-wide", value: "0.12em" },
];

export const leadingTokens: Token[] = [
  { name: "--leading-tight", value: "108%" },
  { name: "--leading-snug", value: "130%" },
  { name: "--leading-relaxed", value: "28px" },
];

export const spacingTokens: Token[] = [
  { name: "--spacing-1", value: "4px" },
  { name: "--spacing-2", value: "8px" },
  { name: "--spacing-3", value: "12px" },
  { name: "--spacing-4", value: "16px" },
  { name: "--spacing-6", value: "24px" },
  { name: "--spacing-8", value: "32px" },
  { name: "--spacing-12", value: "48px" },
  { name: "--spacing-16", value: "64px" },
  { name: "--spacing-24", value: "96px" },
];

export const radiusTokens: Token[] = [
  { name: "--radius-xs", value: "4px" },
  { name: "--radius-sm", value: "8px" },
  { name: "--radius-md", value: "12px" },
  { name: "--radius-lg", value: "16px" },
  { name: "--radius-full", value: "999px" },
];

export const breakpointTokens: Token[] = [
  { name: "--breakpoint-sm", value: "640px" },
  { name: "--breakpoint-md", value: "768px" },
  { name: "--breakpoint-lg", value: "1024px" },
  { name: "--breakpoint-xl", value: "1280px" },
];

export const containerTokens: Token[] = [
  { name: "--container-prose", value: "680px" },
  { name: "--container-wide", value: "1120px" },
];

export const tokenGroups: TokenGroup[] = [
  { id: "cores", title: "01 — Cores", tokens: colorTokens },
  { id: "tipografia", title: "02 — Tipografia", tokens: fontSizeTokens },
  { id: "familias", title: "03 — Famílias", tokens: fontFamilyTokens },
  { id: "pesos", title: "04 — Pesos", tokens: fontWeightTokens },
  { id: "tracking", title: "05 — Tracking", tokens: trackingTokens },
  { id: "leading", title: "06 — Leading", tokens: leadingTokens },
  { id: "espacamento", title: "07 — Espaçamento", tokens: spacingTokens },
  { id: "raios", title: "08 — Raios", tokens: radiusTokens },
  { id: "breakpoints", title: "09 — Breakpoints", tokens: breakpointTokens },
  { id: "containers", title: "10 — Containers", tokens: containerTokens },
];

export const allTokens: Token[] = tokenGroups.flatMap((group) => group.tokens);
