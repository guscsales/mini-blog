import type { FeaturedPost, Post, PostDetail, TagFilter } from "../models/post";
import { readCmsFile } from "./cms";

/**
 * Conteúdo provisório, copiado do layout do Paper. Vai ser trocado pela
 * leitura do `.cms` — a assinatura das funções não muda quando isso acontecer.
 */

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

/** Post completo, com corpo em markdown e navegação para os vizinhos. */
export async function getPostBySlug(slug: string): Promise<PostDetail | undefined> {
  if (slug !== featured.slug) return undefined;

  const content = await readCmsFile(`posts/${slug}.md`);

  return {
    ...featured,
    authorBioShort: "backend desde 2014",
    authorBioFull: "escrevendo sobre backend desde 2014",
    coverCaptionShort: "Latência p95 antes e depois do cache de borda.",
    coverCaptionFull:
      "Latência p95 antes e depois do cache de borda. Legenda de imagem em markdown.",
    tags: ["arquitetura", "performance", "node"],
    content,
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
