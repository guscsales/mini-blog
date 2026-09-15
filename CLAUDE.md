# Mini-Blog Claude Rules

## Contexto

Esse é meu mini-blog, onde faço posts sobre programação web principalmente focado em next.js, tailwindcss, Typescript, bun e agentes de IA como o Claude Code.

## Regras Gerais

- Lógica de negócio mora em `packages/factories`, nunca dentro de `app`.
- Funções reutilizáveis ficam em `packages/utils.ts`.
- UI mora em `packages/ui`.
- `app` (Next.js) nunca chama backend direto — sempre consome dados via funções de `packages/factories`.
- Todo conteúdo é salvo num `.cms`.
- Posts de blog precisam de frontmatter: `title`, `slug`, `published_at` (string ou null).
- App renderiza via SSR/SSG, sem fetch client-side pra conteúdo.
- Todo projeto coberto por testes unitários dentro de uma pasta `__tests__` referente aos arquivos criados naquela pasta.

### Regras do `packages/factories`

- Pasta `models`: são arquivos typescript para referenciar os tipos de dados através de modelos.
- Pasta `services`: são arquivos que implementam a lógica de negócio, onde são retornadas funções que o "app" irá consumir. Serviços são agnosticos de qualquer dado externo. Ele apenas conversa com o que existe dentro de `factories`.

### Regras do `packages/ui`

- Regras gerais vivem em `./globals.css` com as variáveis de estilo globais no padrão tailwind v4.
- Os componentes devem ser criados dentro da pasta `./components`.
- As páginas do `app` devem ser criadas com os componentes de `packages/ui`, não crie páginas completas dentro do packages.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
