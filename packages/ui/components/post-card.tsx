import type { Post } from "../../factories/models/post";
import { CoverImage } from "./cover-image";
import { Meta } from "./meta";

/** Item da listagem: miniatura quadrada à esquerda, texto à direita. */
export function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex gap-[14px] rounded-md border border-border bg-surface p-[14px]">
      <CoverImage
        src={post.cover}
        alt={post.coverAlt}
        sizes="96px"
        className="size-24 rounded-sm"
      />
      <div className="flex grow flex-col gap-[6px]">
        <Meta>
          {post.date} · {post.tag}
        </Meta>
        <h3 className="font-display text-[21px] leading-[116%] tracking-tight text-text">
          {post.title}
        </h3>
        <p className="font-sans text-[13px] leading-5 text-text-muted">{post.excerpt}</p>
      </div>
    </article>
  );
}
