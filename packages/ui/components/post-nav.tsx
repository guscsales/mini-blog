import type { PostNavItem } from "../../factories/models/post";

/** Navegação para o post anterior e o próximo, lado a lado a partir do `lg`. */
export function PostNav({
  previousPost,
  nextPost,
}: {
  previousPost: PostNavItem | null;
  nextPost: PostNavItem | null;
}) {
  if (!previousPost && !nextPost) return null;

  return (
    <div className="mx-auto flex w-full flex-col gap-3 lg:max-w-wide lg:flex-row lg:gap-6">
      {previousPost ? (
        <a
          href={`/${previousPost.slug}`}
          className="flex grow flex-col gap-[10px] rounded-md border border-border bg-surface p-[18px] lg:p-6"
        >
          <span className="font-mono text-[10px] leading-3 tracking-[0.14em] text-text-muted uppercase lg:text-[11px] lg:leading-4">
            ← Anterior
          </span>
          <span className="font-display text-lg leading-[118%] tracking-tight text-text lg:text-xl">
            {previousPost.title}
          </span>
        </a>
      ) : null}

      {nextPost ? (
        <a
          href={`/${nextPost.slug}`}
          className="flex grow flex-col items-start gap-[10px] rounded-md border border-border bg-surface p-[18px] lg:items-end lg:p-6"
        >
          <span className="font-mono text-[10px] leading-3 tracking-[0.14em] text-accent uppercase lg:text-[11px] lg:leading-4">
            Próximo →
          </span>
          <span className="font-display text-lg leading-[118%] tracking-tight text-text lg:text-right lg:text-xl">
            {nextPost.title}
          </span>
        </a>
      ) : null}
    </div>
  );
}
