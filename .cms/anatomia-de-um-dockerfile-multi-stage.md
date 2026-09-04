---
title: Anatomia de um Dockerfile multi-stage
description: Por que separar build e runtime em estágios diferentes reduz a imagem final e o que cada instrução faz.
publishedAt: 2026-08-11
status: published
tags:
  - docker
  - devops
author: Gus
---

Um Dockerfile multi-stage usa mais de um `FROM` no mesmo arquivo — cada `FROM` abre um **estágio** novo, e só o último vira a imagem final.

## O problema que ele resolve

Sem multi-stage, a imagem final carrega junto tudo que só era necessário durante o build: compilador, dependências de desenvolvimento, cache do gerenciador de pacotes. Isso infla a imagem e aumenta a superfície de ataque.

## Estágios de um build típico

1. **Instalar dependências** — só o necessário pra resolver `node_modules`
2. **Build** — compila o projeto usando as dependências do estágio anterior
3. **Runtime** — copia só o resultado do build, sem ferramenta de compilação nenhuma

```dockerfile
FROM oven/bun:1.3 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1.3 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1.3-slim AS runtime
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["bun", "start"]
```

> Cada `COPY --from=<estágio>` traz só o que precisa do estágio anterior — o compilador e as dependências de build nunca chegam na imagem final.

## Comparando tamanho de imagem

| Abordagem              | Contém devDependencies? | Tamanho aproximado |
| ----------------------- | :----------------------: | :------------------: |
| Single-stage             |            Sim            | grande                |
| Multi-stage (3 estágios) |            Não            | pequeno               |

## Comandos úteis pra inspecionar

```bash
# lista as camadas e o tamanho de cada uma
docker history mini-blog:latest

# builda só até um estágio específico, pra debugar
docker build --target build -t mini-blog:build-debug .
```

## Cuidados

- Sempre copiar `bun.lock` **antes** do resto do código, pra aproveitar cache de camada quando só o código muda
- Usar uma tag de versão fixa na imagem base (`bun:1.3`, não `bun:latest`), senão o build deixa de ser reprodutível
- Rodar a imagem final como usuário não-root sempre que o runtime permitir

---

Multi-stage não é sobre economia de espaço só — é sobre a imagem final não carregar nada que o `docker scan` precise auditar sem necessidade.
