import type { FeaturedPost, Post } from "../models/post";

/**
 * Conteúdo provisório, copiado do layout do Paper. Vai ser trocado pela
 * leitura do `.cms` — a assinatura das funções não muda quando isso acontecer.
 */

const featured: FeaturedPost = {
  slug: "a-arte-de-nao-fazer-nada-no-servidor",
  title: "A arte de não fazer nada no servidor",
  excerpt:
    "Cache, streaming e o hábito de adiar trabalho. Três padrões que cortaram 70% do tempo de resposta na nossa API.",
  date: "18 mai 2026",
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
    date: "12 mai",
    tag: "react",
    cover: "/posts/usememo-custa-mais-caro.webp",
    coverAlt: "Lente de vidro curva com reflexo verde",
  },
  {
    slug: "tipos-que-documentam-a-intencao",
    title: "Tipos que documentam a intenção, não a estrutura",
    excerpt: "Branded types e o fim do `string` genérico.",
    date: "05 mai",
    tag: "typescript",
    cover: "/posts/tipos-que-documentam-intencao.webp",
    coverAlt: "Cone de papel branco sobre superfície escura",
  },
  {
    slug: "streams-no-node-sem-sofrer-com-backpressure",
    title: "Streams no Node sem sofrer com backpressure",
    excerpt: "Um guia curto para não travar o event loop.",
    date: "27 abr",
    tag: "node",
    cover: "/posts/streams-no-node.webp",
    coverAlt: "Porta entreaberta com faixa de luz esverdeada",
  },
  {
    slug: "o-build-de-40s-que-virou-4s",
    title: "O build de 40s que virou 4s",
    excerpt: "Onde o tempo estava escondido no nosso monorepo.",
    date: "14 abr",
    tag: "devex",
    cover: "/posts/build-de-40s.webp",
    coverAlt: "Luz de veneziana desenhando listras numa parede",
  },
];

/** O post que abre a listagem. */
export function getFeaturedPost(): FeaturedPost {
  return featured;
}

/** Os demais posts, do mais recente para o mais antigo. */
export function getPosts(): Post[] {
  return posts;
}

/** Resumo mostrado acima do título da home. */
export function getPostsSummary(): { total: number; updatedLabel: string } {
  return { total: 24, updatedLabel: "atualizado hoje" };
}
