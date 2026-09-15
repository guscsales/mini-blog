import type { PostDetail } from "../../factories/models/post";
import { AuthorByline } from "./author-byline";
import { ArrowLeftIcon } from "./icons";
import { Meta } from "./meta";
import { Tag } from "./tag";

/**
 * Abertura do post: trilha de volta, categoria e data, título, resumo e o
 * autor. A coluna trava em 760px a partir do `lg`, a largura de leitura do
 * artboard de desktop.
 */
export function PostHero({ post }: { post: PostDetail }) {
  return (
    <div className="mx-auto flex w-full flex-col gap-4 lg:max-w-[47.5rem] lg:gap-6">
      <a href="/" className="flex items-center gap-2">
        <ArrowLeftIcon className="size-[14px] shrink-0 text-text-muted" />
        <span className="font-sans text-[13px] leading-4 font-medium text-text-muted lg:text-sm lg:leading-[18px]">
          Todos os posts
        </span>
      </a>

      <div className="flex items-center gap-[10px] lg:gap-3">
        <Tag>{post.tag}</Tag>
        <Meta className="text-text-muted lg:text-xs lg:leading-4">
          <span className="lg:hidden">
            {post.date} · {post.readingTime}
          </span>
          <span className="hidden lg:inline">
            {post.fullDate} · {post.readingTime} de leitura
          </span>
        </Meta>
      </div>

      <h1 className="font-display text-3xl leading-tight tracking-tight text-text lg:text-[64px] lg:leading-[106%] lg:tracking-[-0.025em]">
        {post.title}
      </h1>

      <p className="font-sans text-base leading-[26px] text-text-muted lg:text-lg lg:leading-8">
        {post.excerptFull}
      </p>

      <AuthorByline
        name="Gustavo Sales"
        bioShort={post.authorBioShort}
        bioFull={post.authorBioFull}
      />
    </div>
  );
}
