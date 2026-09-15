import type { PostDetail } from "../../factories/models/post";
import { CoverImage } from "./cover-image";

/** Capa do post com legenda — a legenda cresce a partir do `lg`. */
export function PostCover({ post }: { post: PostDetail }) {
  return (
    <div className="mx-auto flex w-full flex-col gap-[10px] lg:max-w-wide lg:gap-3">
      <CoverImage
        src={post.cover}
        alt={post.coverAlt}
        sizes="(max-width: 1024px) 100vw, 1120px"
        className="h-[220px] rounded-md lg:h-[420px] lg:rounded-lg"
        priority
      />
      <p className="font-sans text-xs leading-[19px] text-text-muted lg:text-center lg:text-[13px] lg:leading-5">
        <span className="lg:hidden">{post.coverCaptionShort}</span>
        <span className="hidden lg:inline">{post.coverCaptionFull}</span>
      </p>
    </div>
  );
}
