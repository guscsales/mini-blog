Todo servidor rápido que já mantive tinha uma coisa em comum: ele fazia menos trabalho, não trabalho mais rápido. A diferença parece semântica até você olhar o flamegraph de uma request de 800ms.

Cobre **negrito**, *itálico*, ~~riscado~~, `código inline` e [links](https://example.com).

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

```ts title="lib/posts.ts" showLineNumbers {5}
import { compileMDX } from "next-mdx-remote/rsc"

// lê o markdown do disco e compila
export async function getPost(slug: string) {
  const raw = await readFile(`content/${slug}.md`)
  return compileMDX({ source: raw })
}
```

Bloco de código com scroll horizontal e linha destacada.

## Resultado medido

| Rota | Antes | Depois | Δ |
| --- | --- | --- | --- |
| `GET /feed` | 812 ms | 204 ms | −75% |
| `POST /orders` | 640 ms | 190 ms | −70% |
| `GET /search` | 430 ms | 395 ms | −8% |

### Checklist antes de subir

- [x] Instrumentar as três rotas mais lentas
- [x] Mover envio de e-mail para a fila
- [ ] Definir SLO por rota e alertar no p95

---

Medições com 30 dias de tráfego real, p95 por rota.[^1]

[^1]: Nota de rodapé em GFM.

### Destaque por comentário e por palavra

```ts
export function getPost(slug: string) {
  const cached = cache.get(slug) // [!code highlight]
  if (cached) return cached
  return db.posts.findBySlug(slug) // [!code word:slug]
}
```
