Todo servidor rápido que já mantive tinha uma coisa em comum: ele fazia menos trabalho, não trabalho mais rápido. A diferença parece semântica até você olhar o flamegraph de uma request de 800ms e perceber que 600ms são de coisas que ninguém pediu.

Este post cobre **negrito**, *itálico*, ~~riscado~~, `código inline` e [links](https://example.com) para outros posts.

## Primeiro padrão: adiar

A request não precisa esperar o e-mail sair, o webhook responder ou a thumbnail ser gerada. Empurre para uma fila e devolva 202. Simples de dizer, difícil de aceitar quando o time inteiro cresceu escrevendo handlers síncronos.

### O que dá para adiar

- Envio de e-mail transacional e notificações push
- Geração de PDF, thumbnail e qualquer coisa que use CPU
- Sincronização com sistemas de terceiros que você não controla

> Performance não é uma feature que você adiciona. É trabalho que você decide não fazer.
>
> — citação em blockquote

1. Meça antes. Sem um p95 anotado, qualquer mudança vira fé.
2. Corte o trabalho que ninguém pediu antes de otimizar o que sobrou.
3. Só então pense em cache — cache é o último recurso, não o primeiro.

```ts title="lib/posts.ts" showLineNumbers {5}
import { compileMDX } from "next-mdx-remote/rsc"

// lê o markdown do disco e compila
export async function getPost(slug: string) {
  const raw = await readFile(`content/${slug}.md`)
  return compileMDX({ source: raw })
}
```

A linha destacada é o que o rehype-pretty-code marca com `// [!code highlight]`.

## Resultado medido

| Rota | Antes | Depois | Delta |
| --- | --- | --- | --- |
| `GET /feed` | 812 ms | 204 ms | −75% |
| `POST /orders` | 640 ms | 190 ms | −70% |
| `GET /search` | 430 ms | 395 ms | −8% |

### Checklist antes de subir

- [x] Instrumentar as três rotas mais lentas
- [x] Mover envio de e-mail para a fila
- [ ] Definir SLO por rota e alertar no p95

---

Medições feitas com 30 dias de tráfego real, p95 por rota, excluindo cold starts.[^1]

[^1]: Nota de rodapé em GFM.
