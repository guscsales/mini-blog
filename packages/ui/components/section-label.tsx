import { Meta } from "./meta";

/** Rótulo de seção, uma régua que ocupa o resto da linha e um sufixo opcional. */
export function SectionLabel({
  children,
  trailing,
}: {
  children: React.ReactNode;
  /** Texto à direita da régua — no desktop a home mostra o ano aqui. */
  trailing?: string;
}) {
  return (
    <div className="flex items-center gap-3 lg:gap-4">
      <Meta tracking="wider" className="shrink-0 text-text-muted lg:text-xs lg:leading-4">
        {children}
      </Meta>
      <div className="h-px grow bg-border-strong" />
      {trailing ? (
        <Meta className="hidden shrink-0 text-text-muted lg:block lg:text-xs lg:leading-4">
          {trailing}
        </Meta>
      ) : null}
    </div>
  );
}
