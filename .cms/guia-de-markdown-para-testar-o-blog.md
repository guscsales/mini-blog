---
title: Guia de markdown para testar o blog
description: Um post com de tudo um pouco — tabela, código, citação, lista — pra validar o parser de uma vez só.
publishedAt: 2026-09-01
status: published
tags:
  - markdown
  - testes
author: Gus
---

Este post existe só pra **estressar o parser**. Se algo aqui quebrar, achamos o bug antes do leitor.

## Texto e ênfase

Um parágrafo com *itálico*, **negrito**, ***negrito e itálico***, `código inline` e ~~texto riscado~~. Também dá pra linkar coisas, tipo o [changelog do Next.js](https://nextjs.org/blog) ou um autolink puro: https://developer.mozilla.org.

## Listas

Lista não ordenada, com um item aninhado:

- Frontmatter vira metadata da página
- Corpo vira HTML via `marked`
  - inclusive itens aninhados
  - como este aqui
- Status controla o que aparece na listagem

Lista ordenada:

1. Ler o arquivo `.md` da pasta `.cms/`
2. Separar frontmatter do corpo com `gray-matter`
3. Renderizar o corpo com `toContentBodyHtml`

Lista de tarefas (checklist do GFM):

- [x] Suporte a tabela
- [x] Suporte a bloco de código
- [ ] Suporte a footnote

## Citação

> Conteúdo é file-based, não vem de banco nem de CMS externo — cada post é um arquivo markdown dentro de `.cms/`.

## Código

Trecho inline: use `bun dev` pra subir o projeto. Bloco com destaque de linguagem:

```ts
export function toContentBodyHtml(body: string): string {
  return marked.parse(body, { async: false, gfm: true, breaks: false });
}
```

E um bloco sem linguagem declarada:

```
saída crua, sem highlight
linha 2
```

## Tabela

| Elemento       | Suportado pelo `marked`? | Observação                  |
| -------------- | :----------------------: | ---------------------------- |
| Tabela         |            ✅            | precisa de `gfm: true`       |
| Checklist      |            ✅            | vira `<input disabled>`      |
| Strikethrough  |            ✅            | `~~texto~~`                  |
| Footnote       |            ❌            | não faz parte do GFM padrão  |

## Imagem

![Ícone de globo, usado como placeholder de imagem](/globe.svg)

## Divisor

---

Fim do post. Se chegou até aqui sem quebrar o layout, o `.prose` do `globals.css` está de pé.
