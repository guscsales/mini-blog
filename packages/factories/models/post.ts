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

/** Post vizinho, usado na navegação anterior/próximo do rodapé do post. */
export type PostNavItem = {
  slug: string;
  title: string;
};

/** Página completa de um post: metadados da listagem mais o corpo e a navegação. */
export type PostDetail = Post & {
  /** Bio curta do autor, mostrada no mobile. */
  authorBioShort: string;
  /** Bio completa, mostrada a partir do desktop. */
  authorBioFull: string;
  /** Legenda curta da capa, mostrada no mobile. */
  coverCaptionShort: string;
  /** Legenda completa, mostrada a partir do desktop. */
  coverCaptionFull: string;
  /** Todas as tags do post; a primeira é a categoria principal. */
  tags: string[];
  /** Corpo em markdown, lido do `.cms`. */
  content: string;
  previousPost: PostNavItem | null;
  nextPost: PostNavItem | null;
};
