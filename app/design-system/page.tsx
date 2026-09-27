import { ColorTokens } from "@/packages/ui/components/design-system/color-tokens";
import {
  LayoutTokens,
  RadiusTokens,
  SpacingTokens,
} from "@/packages/ui/components/design-system/layout-tokens";
import { LogoShowcase } from "@/packages/ui/components/design-system/logo-showcase";
import { MarkdownShowcase } from "@/packages/ui/components/design-system/markdown-showcase";
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

const markdownSource = `Todo servidor rápido que já mantive tinha uma coisa em comum: ele fazia menos trabalho, não trabalho mais rápido. A diferença parece semântica até você olhar o flamegraph de uma request de 800ms.

Cobre **negrito**, *itálico*, ~~riscado~~, \`código inline\` e [links](https://example.com).

## Primeiro padrão: adiar

A request não precisa esperar o e-mail sair nem o webhook responder. Empurre para uma fila e devolva 202.

### Quando vale a pena

- E-mail transacional e notificações push
- Geração de PDF e thumbnail
- Sync com terceiros que você não controla

> Performance não é uma feature que você adiciona. É trabalho que você decide não fazer.
>
> — citação em blockquote

1. Meça antes. Sem p95 anotado, tudo vira fé.
2. Corte o trabalho que ninguém pediu.
3. Cache é o último recurso, não o primeiro.

\`\`\`ts title="lib/posts.ts" showLineNumbers {5}
import { compileMDX } from "next-mdx-remote/rsc"

// lê o markdown do disco e compila
export async function getPost(slug: string) {
  const raw = await readFile(\`content/\${slug}.md\`)
  return compileMDX({ source: raw })
}
\`\`\`

Bloco de código com scroll horizontal e linha destacada.

## Resultado medido

| Rota | Antes | Depois | Δ |
| --- | --- | --- | --- |
| \`GET /feed\` | 812 ms | 204 ms | −75% |
| \`POST /orders\` | 640 ms | 190 ms | −70% |
| \`GET /search\` | 430 ms | 395 ms | −8% |

### Checklist antes de subir

- [x] Instrumentar as três rotas mais lentas
- [x] Mover envio de e-mail para a fila
- [ ] Definir SLO por rota e alertar no p95

---

Medições com 30 dias de tráfego real, p95 por rota.[^1]

[^1]: Nota de rodapé em GFM.

### Destaque por comentário e por palavra

\`\`\`ts
export function getPost(slug: string) {
  const cached = cache.get(slug) // [!code highlight]
  if (cached) return cached
  return db.posts.findBySlug(slug) // [!code word:slug]
}
\`\`\`
`;

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

      <Section title="08 — Markdown">
        <MarkdownShowcase source={markdownSource} />
      </Section>
    </PageShell>
  );
}
