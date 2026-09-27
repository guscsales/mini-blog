import type { FeaturedPost, Post, PostDetail, TagFilter } from "../models/post";

/** Conteúdo provisório, copiado do layout do Paper. */

const featured: FeaturedPost = {
  slug: "a-arte-de-nao-fazer-nada-no-servidor",
  title: "A arte de não fazer nada no servidor",
  excerpt:
    "Cache, streaming e o hábito de adiar trabalho. Três padrões que cortaram 70% do tempo de resposta na nossa API.",
  excerptFull:
    "Cache, streaming e o hábito de adiar trabalho. Três padrões que cortaram 70% do tempo de resposta na nossa API — e o único que deu errado.",
  date: "18 mai",
  fullDate: "18 mai 2026",
  readingTime: "12 min",
  tag: "arquitetura",
  cover: "/posts/arte-de-nao-fazer-nada.webp",
  coverAlt: "Corredor de datacenter com luzes verdes em fuga",
};

const posts: Post[] = [
  {
    slug: "quando-o-usememo-custa-mais-caro-que-o-render",
    title: "Quando o useMemo custa mais caro que o render",
    excerpt: "Memoizar tudo tem preço. Medimos o custo real.",
    excerptFull:
      "Memoizar tudo tem preço. Medimos o custo real em três apps de produção.",
    date: "12 mai",
    fullDate: "12 mai 2026",
    readingTime: "8 min",
    tag: "react",
    cover: "/posts/usememo-custa-mais-caro.webp",
    coverAlt: "Lente de vidro curva com reflexo verde",
  },
  {
    slug: "tipos-que-documentam-a-intencao",
    title: "Tipos que documentam a intenção, não a estrutura",
    excerpt: "Branded types e o fim do `string` genérico.",
    excerptFull:
      "Branded types, discriminated unions e o fim do string genérico.",
    date: "05 mai",
    fullDate: "05 mai 2026",
    readingTime: "6 min",
    tag: "typescript",
    cover: "/posts/tipos-que-documentam-intencao.webp",
    coverAlt: "Cone de papel branco sobre superfície escura",
  },
  {
    slug: "streams-no-node-sem-sofrer-com-backpressure",
    title: "Streams no Node sem sofrer com backpressure",
    excerpt: "Um guia curto para não travar o event loop.",
    excerptFull:
      "Um guia curto para processar 2 GB de CSV sem travar o event loop.",
    date: "27 abr",
    fullDate: "27 abr 2026",
    readingTime: "9 min",
    tag: "node",
    cover: "/posts/streams-no-node.webp",
    coverAlt: "Porta entreaberta com faixa de luz esverdeada",
  },
  {
    slug: "o-build-de-40s-que-virou-4s",
    title: "O build de 40s que virou 4s",
    excerpt: "Onde o tempo estava escondido no nosso monorepo.",
    excerptFull:
      "Onde o tempo estava escondido no nosso monorepo — e como achamos.",
    date: "14 abr",
    fullDate: "14 abr 2026",
    readingTime: "5 min",
    tag: "devex",
    cover: "/posts/build-de-40s.webp",
    coverAlt: "Luz de veneziana desenhando listras numa parede",
  },
  {
    slug: "container-queries-mataram-meus-breakpoints",
    title: "Container queries mataram meus breakpoints",
    excerpt: "Componentes que se adaptam ao pai.",
    excerptFull: "Componentes que se adaptam ao pai, não à janela.",
    date: "02 abr",
    fullDate: "02 abr 2026",
    readingTime: "7 min",
    tag: "css",
    cover: "/posts/container-queries.png",
    coverAlt: "Folha de papel curvada sobre mesa escura",
  },
  {
    slug: "testes-que-quebram-por-motivo-certo",
    title: "Testes que quebram por motivo certo",
    excerpt: "Voltar a testar comportamento, não implementação.",
    excerptFull:
      "Como parar de testar implementação e voltar a testar comportamento.",
    date: "21 mar",
    fullDate: "21 mar 2026",
    readingTime: "11 min",
    tag: "testes",
    cover: "/posts/testes-que-quebram.png",
    coverAlt: "Superfície escura curvada sob luz de veneziana",
  },
];

const tagFilters: TagFilter[] = [
  { label: "typescript", active: true },
  { label: "react", active: false },
  { label: "node", active: false },
  { label: "devex", active: false },
];

/** O post que abre a listagem. */
export function getFeaturedPost(): FeaturedPost {
  return featured;
}

/** Os demais posts, do mais recente para o mais antigo. */
export function getPosts(): Post[] {
  return posts;
}

/** Tags oferecidas como atalho de filtro na home. */
export function getTagFilters(): TagFilter[] {
  return tagFilters;
}

const featuredContent = `Todo servidor rápido que já mantive tinha uma coisa em comum: ele fazia menos trabalho, não trabalho mais rápido. A diferença parece semântica até você olhar o flamegraph de uma request de 800ms e perceber que 600ms são de coisas que ninguém pediu.

Este post cobre **negrito**, *itálico*, ~~riscado~~, \`código inline\` e [links](https://example.com) para outros posts.

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

\`\`\`ts title="lib/posts.ts" showLineNumbers {5}
import { compileMDX } from "next-mdx-remote/rsc"

// lê o markdown do disco e compila
export async function getPost(slug: string) {
  const raw = await readFile(\`content/\${slug}.md\`)
  return compileMDX({ source: raw })
}
\`\`\`

A linha destacada é o que o rehype-pretty-code marca com \`// [!code highlight]\`.

## Resultado medido

| Rota | Antes | Depois | Delta |
| --- | --- | --- | --- |
| \`GET /feed\` | 812 ms | 204 ms | −75% |
| \`POST /orders\` | 640 ms | 190 ms | −70% |
| \`GET /search\` | 430 ms | 395 ms | −8% |

### Checklist antes de subir

- [x] Instrumentar as três rotas mais lentas
- [x] Mover envio de e-mail para a fila
- [ ] Definir SLO por rota e alertar no p95

---

Medições feitas com 30 dias de tráfego real, p95 por rota, excluindo cold starts.[^1]

[^1]: Nota de rodapé em GFM.
`;

/** Post completo, com corpo em markdown e navegação para os vizinhos. */
export function getPostBySlug(slug: string): PostDetail | undefined {
  if (slug !== featured.slug) return undefined;

  return {
    ...featured,
    authorBioShort: "backend desde 2014",
    authorBioFull: "escrevendo sobre backend desde 2014",
    coverCaptionShort: "Latência p95 antes e depois do cache de borda.",
    coverCaptionFull:
      "Latência p95 antes e depois do cache de borda. Legenda de imagem em markdown.",
    tags: ["arquitetura", "performance", "node"],
    content: featuredContent,
    previousPost: {
      slug: "streams-no-node-sem-sofrer-com-backpressure",
      title: "Streams no Node sem sofrer com backpressure",
    },
    nextPost: {
      slug: "tipos-que-documentam-a-intencao",
      title: "Tipos que documentam a intenção, não a estrutura",
    },
  };
}

/** Resumo mostrado acima do título da home. */
export function getPostsSummary(): {
  total: number;
  updatedLabel: string;
  description: string;
  year: string;
} {
  return {
    total: 24,
    updatedLabel: "atualizado hoje",
    description:
      "Performance, tipos, arquitetura e as ferramentas que uso todo dia. Sem tutorial de hello world.",
    year: "2026",
  };
}
