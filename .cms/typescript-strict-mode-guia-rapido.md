---
title: "TypeScript strict mode: guia rápido"
description: O que cada flag do modo strict liga de fato, e por que este repositório roda com todas ativadas.
publishedAt: 2026-04-20
status: published
tags:
  - typescript
author: Gus
---

`strict: true` no `tsconfig.json` não é uma flag única — é um atalho que liga várias outras ao mesmo tempo.

## O que `strict: true` liga por baixo dos panos

| Flag                           | O que muda                                                        |
| ------------------------------- | -------------------------------------------------------------------- |
| `strictNullChecks`               | `null` e `undefined` deixam de ser aceitos em qualquer tipo            |
| `noImplicitAny`                  | parâmetro sem tipo explícito vira erro, não `any` silencioso           |
| `strictFunctionTypes`            | parâmetros de função são checados de forma contravariante              |
| `strictPropertyInitialization`   | propriedade de classe precisa ser inicializada no construtor           |
| `noImplicitThis`                 | `this` implícito com tipo `any` vira erro                              |

## Exemplo prático

Sem `strictNullChecks`, este código compila e explode em runtime:

```ts
function toOptionalString(value: unknown): string {
  if (typeof value !== "string") return null; // ok sem strictNullChecks
  return value.trim();
}
```

Com strict mode ligado, o compilador recusa antes mesmo de rodar:

```
Type 'null' is not assignable to type 'string'.
```

É exatamente esse tipo de erro que o `content-mapper.ts` evita ao declarar o retorno como `string | null` explicitamente:

```ts
function toOptionalString(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
```

## Vale a pena ligar em projeto novo?

> Sempre. O custo de migrar um projeto grande *depois* pro strict mode é muito maior que o custo de já nascer com ele — cada `any` implícito viraria um ponto cego pra caçar manualmente.

Checklist pra quem está migrando um projeto legado:

1. Ligar `noImplicitAny` primeiro e resolver os erros
2. Ligar `strictNullChecks` e tratar cada `null`/`undefined` que aparecer
3. Só então ligar `strict: true` inteiro e deixar o TypeScript pegar o resto

## Efeitos colaterais úteis

- Editor autocompleta melhor, porque os tipos deixam de ser `any` disfarçado
- Refatoração fica mais segura — o compilador aponta todo lugar que quebrou
- Menos `// @ts-ignore` espalhado pelo código

Nem tudo é vantagem: o tempo de build do `tsc` cresce um pouco com mais checagem acontecendo.
