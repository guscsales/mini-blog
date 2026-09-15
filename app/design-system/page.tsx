import { ColorTokens } from "@/packages/ui/components/design-system/color-tokens";
import {
  LayoutTokens,
  RadiusTokens,
  SpacingTokens,
} from "@/packages/ui/components/design-system/layout-tokens";
import { LogoShowcase } from "@/packages/ui/components/design-system/logo-showcase";
import {
  FontWeights,
  Leadings,
  Trackings,
} from "@/packages/ui/components/design-system/text-metrics";
import {
  FontFamilies,
  TypeScale,
  TypeSpecimen,
} from "@/packages/ui/components/design-system/typography";
import { Logo } from "@/packages/ui/components/logo";
import { PageHeader } from "@/packages/ui/components/page-header";
import { PageShell } from "@/packages/ui/components/page-shell";
import { Section } from "@/packages/ui/components/section";

export const metadata = {
  title: "Design System · mini-blog",
  description: "Tokens do mini-blog importados do Paper.",
};

export default function DesignSystemPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Design System · v0.1"
        title={
          <>
            <h1 className="sr-only">mini-blog</h1>
            <Logo height={72} decorative />
          </>
        }
      >
        Tokens importados do Paper e servidos por{" "}
        <code className="font-mono text-sm text-accent">
          packages/ui/globals.css
        </code>
        . Tudo nesta página usa apenas classes do tema — nenhum valor cru.
      </PageHeader>

      <Section title="00 — Logo">
        <LogoShowcase />
      </Section>

      <Section title="01 — Cores">
        <ColorTokens />
      </Section>

      <Section title="02 — Tipografia">
        <div className="flex flex-col gap-8">
          <TypeSpecimen />
          <TypeScale />
        </div>
      </Section>

      <Section title="03 — Famílias">
        <FontFamilies />
      </Section>

      <Section title="04 — Pesos, tracking e leading">
        <div className="grid gap-x-12 gap-y-4 lg:grid-cols-3">
          <FontWeights />
          <Trackings />
          <Leadings />
        </div>
      </Section>

      <Section title="05 — Espaçamento">
        <SpacingTokens />
      </Section>

      <Section title="06 — Raios">
        <RadiusTokens />
      </Section>

      <Section title="07 — Breakpoints e containers">
        <LayoutTokens />
      </Section>
    </PageShell>
  );
}
