/** Um post do blog, já no formato que a UI consome. */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** Data pronta para exibição, como aparece na listagem. */
  date: string;
  tag: string;
  /** Caminho da imagem de capa dentro de `public/`. */
  cover: string;
  /** Texto alternativo da capa. */
  coverAlt: string;
};

/** Post em destaque: tem tempo de leitura e data por extenso. */
export type FeaturedPost = Post & {
  readingTime: string;
  fullDate: string;
};
