---
title: "Bun, npm e pnpm: o que muda na prática"
description: Comparando os três gerenciadores de pacote em instalação, lockfile e scripts do dia a dia.
publishedAt: 2026-07-14
status: published
tags:
  - bun
  - node
  - ferramentas
author: Gus
---

Esse projeto usa **bun** (`packageManager: bun@1.3.11`), mas vale entender onde ele se parece e onde diverge de `npm` e `pnpm`.

## Comandos equivalentes

| Ação                     | npm                | pnpm               | bun            |
| ------------------------ | ------------------- | ------------------- | -------------- |
| Instalar dependências     | `npm install`       | `pnpm install`       | `bun install`  |
| Rodar script do `package.json` | `npm run dev`  | `pnpm dev`           | `bun dev`      |
| Adicionar dependência     | `npm install zod`   | `pnpm add zod`       | `bun add zod`  |
| Executar binário do pacote | `npx tsc`          | `pnpm exec tsc`      | `bunx tsc`     |

## Por que o lockfile importa

> Instalar sem lockfile versionado é abrir mão de builds reprodutíveis — cada máquina pode resolver uma árvore de dependências diferente.

O `bun.lock` deste repositório fica no controle de versão pelo mesmo motivo que o `package-lock.json` ou o `pnpm-lock.yaml` ficariam em outro projeto.

## Instalação na prática

```bash
# clona o repositório
git clone git@github.com:exemplo/mini-blog.git
cd mini-blog

# instala com bun, respeitando o bun.lock
bun install

# sobe o servidor de desenvolvimento
bun dev
```

Repare que não existe `npm-shrinkwrap.json` nem `.npmrc` aqui — a configuração inteira do gerenciador vive no `package.json` e no lockfile do bun.

## Checklist de migração

- [x] Trocar `npm install` por `bun install` no CI
- [x] Trocar `npx` por `bunx` nos scripts
- [ ] Remover lockfiles antigos (`package-lock.json`, `yarn.lock`) do repositório

Performance à parte, o ganho real costuma ser **menos tempo esperando instalação** — principalmente em monorepos.
