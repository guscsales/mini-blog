# CLAUDE.md

Este arquivo fornece orientação ao Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

@AGENTS.md

## O produto

Mini-blog: um site com duas telas principais.

1. **Listagem de posts** — todos os posts, sempre ordenados por data de publicação em ordem **decrescente** (mais recente primeiro).
2. **Detalhe do post** — a leitura de um post individual.

O conteúdo é file-based, não vem de banco nem de CMS externo: cada post é um arquivo **markdown** dentro da pasta `.cms/` na raiz do repositório. Escrever um post = criar um `.md` ali. Como os posts são o conteúdo do site, `.cms/` é versionado no git (não entra no `.gitignore`).

**O git é o CMS.** O `.cms/` é entrada de build, não estado de runtime: os arquivos são lidos para gerar as páginas e nunca são escritos pela aplicação. Publicar ou despublicar um post = editar o `status` no frontmatter, commitar e fazer deploy. Não crie endpoints, server actions ou qualquer código que escreva dentro de `.cms/` — em serverless o filesystem é read-only, e num servidor comum a escrita sumiria no próximo deploy e faria o repositório divergir do site.

*Estado atual: a pasta `.cms/` e as rotas ainda não existem — o repositório está no template do create-next-app. Ao implementar, siga essa estrutura.*

## Idioma

Responda sempre em pt-BR nesta base de código. Código, commits, PRs e mensagens de erro permanecem em inglês.

## Comandos

O gerenciador de pacotes é o **bun** (`packageManager: bun@1.3.11`, com `bun.lock` versionado). Use `bun` / `bunx`, não npm.

```bash
bun dev      # next dev — http://localhost:3000
bun run build
bun start    # serve o build de produção
bun run lint # eslint (flat config)
```

Não há test runner configurado.

## Versão do Next.js

Next.js **16.3.4** com React **19.2.8**. Isso é mais novo que a maior parte dos dados de treino — antes de escrever qualquer código Next.js (routing, data fetching, caching, config, APIs), leia o guia correspondente em `node_modules/next/dist/docs/` (`01-app/`, `02-pages/`, `03-architecture/`, `index.md`). Não confie em convenções de Next.js memorizadas.

## Skills de frontend

Toda vez que for criar ou alterar UI, invoque a skill `design-taste-frontend` **antes** de escrever o código. Se for redesenhar uma tela que já existe, use `redesign-existing-projects`. Nunca produza UI sem passar por uma das duas.

## Regra de negócio: `packages/factories`

Toda regra de negócio é **agnóstica** (nada de React, Next, JSX ou APIs de browser) e vive em `packages/factories/<escopo>/`. As rotas em `app/` só orquestram e renderizam — elas chamam as factories, nunca reimplementam a regra.

Cada escopo se organiza em pastas por responsabilidade: `services/`, `models/`, `mappers/`, `constants/`, etc.

```
packages/factories/
  contents/
    services/content-service.ts   # ler conteúdo, alterar status, ordenar por data...
    models/
    mappers/
    constants/
```

Exemplo: `packages/factories/contents/services/content-service.ts` concentra as regras de consumo de conteúdo, mudança de status e afins. Mesma ideia para os demais arquivos e pastas.

## Utilitários: `packages/utils.ts`

Toda função utilitária (formatar data, slugify, truncar texto, etc.) vive em `packages/utils.ts` — um arquivo único, compartilhado, também **agnóstico** (nada de React, Next, JSX ou APIs de browser).

Nunca deixe utilitário isolado dentro de uma aplicação (`app/_lib/`, `app/utils.ts` e afins são proibidos): se é utilitário, sobe pro `packages/` para poder ser reusado por qualquer app do repositório.

```ts
// app/page.tsx
import { formatPublishedAt } from "@/packages/utils";
```

Regra de negócio continua em `packages/factories/<escopo>/` — `utils.ts` é só helper genérico, sem conhecimento de domínio.

## Arquitetura

Somente App Router, sem diretório `src/`. As rotas ficam direto em `app/`; assets estáticos em `public/`.

- `app/layout.tsx` — root layout. Carrega Geist / Geist Mono via `next/font/google` nas variáveis CSS `--font-geist-sans` / `--font-geist-mono`. As props do layout são tipadas com o global gerado pelo Next `LayoutProps<"/">` (vem de `.next/types`, não é importado) — use os mesmos helpers gerados (`PageProps<...>`, etc.) em novas rotas em vez de tipos escritos à mão, e rode `bun dev` ou `bun run build` uma vez para que os tipos existam.
- `app/globals.css` — Tailwind **v4**: configurado inteiramente em CSS via `@import "tailwindcss"` e `@theme inline`. Não existe `tailwind.config.*`; adicione design tokens como variáveis CSS dentro do bloco `@theme inline`. O plugin do PostCSS é `@tailwindcss/postcss`.
- Dark mode é dirigido por `prefers-color-scheme` (overrides no `:root` em `globals.css` mais variantes `dark:` na marcação).

TypeScript em modo `strict`, alias de path `@/*` aponta para a raiz do repositório.

## AGENTS.md

O `AGENTS.md` é gerado e recriado pelo `next dev` (veja `node_modules/next/dist/server/lib/generate-agent-files.js`). Não apague; commite junto com seu trabalho se ele reaparecer como mudança não commitada.
