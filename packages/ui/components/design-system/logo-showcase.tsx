import { Logo } from "../logo";

function Variant({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      {children}
      <p className="font-mono text-xs text-text-muted">{caption}</p>
    </div>
  );
}

/** As variações do wordmark sobre cada fundo previsto pelo design system. */
export function LogoShowcase() {
  return (
    <div className="flex flex-wrap items-end gap-12">
      <Variant caption="56px · sobre --color-bg">
        <Logo height={56} />
      </Variant>
      <Variant caption="32px · sobre --color-surface">
        <div className="rounded-md border border-border bg-surface px-8 py-6">
          <Logo height={32} />
        </div>
      </Variant>
      <Variant caption="32px · invertido">
        <div className="rounded-md bg-text px-8 py-6">
          <Logo height={32} className="text-bg" accentClassName="fill-accent-dim" />
        </div>
      </Variant>
    </div>
  );
}
