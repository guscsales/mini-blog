import { Meta } from "./meta";

/** Rótulo de seção seguido de uma régua que ocupa o resto da linha. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <Meta tracking="wider" className="shrink-0 text-text-muted">
        {children}
      </Meta>
      <div className="h-px grow bg-border-strong" />
    </div>
  );
}
