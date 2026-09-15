import type { FeaturedPost } from "../../factories/models/post";
import { ArrowLink } from "./arrow-link";
import { Badge, Tag } from "./tag";
import { CoverImage } from "./cover-image";
import { Meta } from "./meta";

/** Post que abre a listagem: capa grande, selo de destaque e resumo. */
export function FeaturedPostCard({ post }: { post: FeaturedPost }) {
  return (
    <article className="flex flex-col overflow-clip rounded-lg border border-border-strong bg-surface">
      <div className="relative">
        <CoverImage
          src={post.cover}
          alt={post.coverAlt}
          sizes="(max-width: 430px) 100vw, 390px"
          className="h-[200px]"
          priority
        />
        <div className="absolute top-[14px] left-[14px]">
          <Badge>Destaque</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-5 pt-[22px] pb-6">
        <div className="flex items-center gap-[10px]">
          <Tag>{post.tag}</Tag>
          <Meta>
            {post.fullDate} · {post.readingTime}
          </Meta>
        </div>
        <h2 className="font-display text-[30px] leading-[114%] tracking-tight text-text">
          {post.title}
        </h2>
        <p className="font-sans text-[15px] leading-6 text-text-muted">{post.excerpt}</p>
        <div className="pt-1">
          <ArrowLink href={`/${post.slug}`}>Ler mais</ArrowLink>
        </div>
      </div>
    </article>
  );
}
