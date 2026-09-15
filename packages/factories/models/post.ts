/** Um post do blog, já no formato que a UI consome. */
export type Post = {
  slug: string;
  title: string;
  /** Resumo curto, usado na listagem compacta do mobile. */
  excerpt: string;
  /** Resumo completo, que cabe no card maior do desktop. */
  excerptFull: string;
  /** Data enxuta: "12 mai". */
  date: string;
  /** Data com ano: "12 mai 2026". */
  fullDate: string;
  readingTime: string;
  tag: string;
  /** Caminho da imagem de capa dentro de `public/`. */
  cover: string;
  /** Texto alternativo da capa. */
  coverAlt: string;
};

/** Post em destaque: abre a listagem e tem resumo próprio. */
export type FeaturedPost = Post;

/** Filtro por tag mostrado ao lado do título da home. */
export type TagFilter = {
  label: string;
  /** A tag ativa aparece preenchida; as outras, só contornadas. */
  active: boolean;
};
