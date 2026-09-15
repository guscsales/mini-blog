import type { Post } from "../../factories/models/post";
import { CoverImage } from "./cover-image";
import { Meta } from "./meta";
import { Tag } from "./tag";

/**
 * Item da listagem. No mobile é uma linha com miniatura quadrada à esquerda; a
 * partir de `lg` vira um card vertical com a capa ocupando o topo.
 */
export function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex gap-[14px] rounded-md border border-border bg-surface p-[14px] lg:flex-col lg:gap-0 lg:overflow-clip lg:p-0">
      <CoverImage
        src={post.cover}
        alt={post.coverAlt}
        sizes="(max-width: 1024px) 96px, 357px"
        className="size-24 rounded-sm lg:h-[180px] lg:w-full lg:rounded-none lg:border-b lg:border-border"
      />

      <div className="flex grow flex-col gap-[6px] lg:gap-3 lg:px-[22px] lg:pt-[22px] lg:pb-[26px]">
        <div className="flex items-center gap-[10px]">
          <span className="hidden lg:inline">
            <Tag>{post.tag}</Tag>
          </span>
          <Meta className="text-text-muted lg:hidden">
            {post.date} · {post.tag}
          </Meta>
          <Meta className="hidden text-text-muted lg:block">
            {post.fullDate} · {post.readingTime}
          </Meta>
        </div>

        <h3 className="font-display text-[21px] leading-[116%] tracking-tight text-text lg:text-[26px]">
          {post.title}
        </h3>

        <p className="font-sans text-[13px] leading-5 text-text-muted lg:hidden">
          {post.excerpt}
        </p>
        <p className="hidden font-sans text-sm leading-[23px] text-text-muted lg:block">
          {post.excerptFull}
        </p>
      </div>
    </article>
  );
}
