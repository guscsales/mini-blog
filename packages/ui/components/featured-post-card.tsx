import type { FeaturedPost } from "../../factories/models/post";
import { ArrowLink } from "./arrow-link";
import { Badge, Tag } from "./tag";
import { CoverImage } from "./cover-image";
import { Meta } from "./meta";

/**
 * Post que abre a listagem. Capa em cima no mobile; a partir de `lg` a capa vai
 * para a esquerda e o texto ocupa a coluna da direita.
 */
export function FeaturedPostCard({ post }: { post: FeaturedPost }) {
  return (
    <article className="flex flex-col overflow-clip rounded-lg border border-border-strong bg-surface lg:flex-row">
      <div className="relative lg:w-[660px] lg:shrink-0 lg:border-r lg:border-border">
        <CoverImage
          src={post.cover}
          alt={post.coverAlt}
          sizes="(max-width: 1024px) 100vw, 660px"
          className="h-[200px] lg:h-[416px]"
          priority
        />
        <div className="absolute top-[14px] left-[14px] lg:top-5 lg:left-5">
          <Badge>Destaque</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-5 pt-[22px] pb-6 lg:grow lg:justify-center lg:gap-[18px] lg:p-12">
        <div className="flex items-center gap-[10px] lg:gap-3">
          <span className="lg:hidden">
            <Tag>{post.tag}</Tag>
          </span>
          <span className="hidden lg:inline">
            <Tag size="md">{post.tag}</Tag>
          </span>
          <Meta className="text-text-muted lg:text-xs lg:leading-4">
            {post.fullDate} · {post.readingTime}
          </Meta>
        </div>

        <h2 className="font-display text-[30px] leading-[114%] tracking-tight text-text lg:text-[44px] lg:leading-[110%]">
          {post.title}
        </h2>

        <p className="font-sans text-[15px] leading-6 text-text-muted lg:hidden">
          {post.excerpt}
        </p>
        <p className="hidden font-sans text-base leading-relaxed text-text-muted lg:block">
          {post.excerptFull}
        </p>

        <div className="pt-1 lg:pt-2">
          <ArrowLink href={`/${post.slug}`}>Ler mais</ArrowLink>
        </div>
      </div>
    </article>
  );
}
