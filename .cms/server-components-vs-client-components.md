---
title: Server components vs client components no Next 16
description: Onde cada um roda, quando usar "use client" e por que isso afeta o que a gente escreve em packages/factories.
publishedAt: 2026-06-05
status: published
tags:
  - next
  - react
  - arquitetura
author: Gus
---

No App Router, todo componente é **server component** por padrão. Só vira client component quando o arquivo declara `"use client"` no topo.

## Onde cada um roda

- Server component
  - Executa só no servidor, nunca é enviado como JS pro navegador
  - Pode ser `async` e chamar direto `fs`, banco, ou qualquer API do Node
  - Não pode usar `useState`, `useEffect` ou qualquer hook de interação
- Client component
  - Roda no navegador (e também no servidor, na primeira renderização)
  - Precisa de `"use client"` na primeira linha do arquivo
  - É onde `onClick`, `useState` e afins são permitidos

## Exemplo do próprio projeto

A página de detalhe do post é um server component `async`, que busca o conteúdo direto no factory:

```tsx
export default async function ContentPage(props: PageProps<"/posts/[slug]">) {
  const { slug } = await props.params;
  const content = await getContentBySlug(slug);

  if (!content) notFound();

  return <article>{/* ... */}</article>;
}
```

Repare que não existe `useEffect` buscando dado depois do render — o `fs.readFile` roda antes mesmo de qualquer HTML ser gerado.

## Por que a regra fica nas factories

> Regra de negócio é agnóstica — nada de React, Next, JSX ou API de browser — e vive em `packages/factories/<escopo>/`. As rotas em `app/` só orquestram e renderizam.

Isso significa que `content-service.ts` não sabe se quem o chamou é um server component, uma rota de API ou um teste. Ele só lê arquivo, valida frontmatter e devolve dado.

## Tabela de decisão rápida

| Preciso de...                          | Tipo de componente |
| --------------------------------------- | :-----------------: |
| Ler arquivo do disco (`.cms/*.md`)      | Server               |
| Formulário com `onSubmit` no navegador  | Client               |
| Só renderizar dado que já veio pronto   | Server               |
| `useState` para abrir/fechar um menu    | Client               |

## Nota lateral

Vale lembrar: marcar `"use client"` não significa que o componente *só* roda no cliente — ele ainda passa por uma renderização inicial no servidor antes da hidratação.

---

Resumo: comece server, adicione `"use client"` só quando o compilador reclamar de hook ou evento de navegador.
