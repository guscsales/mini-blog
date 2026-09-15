import Image from "next/image";

import {
  getFeaturedPost,
  getPosts,
  getPostsSummary,
} from "@/packages/factories/services/posts";

export default function HomePage() {
  const featured = getFeaturedPost();
  const posts = getPosts();
  const summary = getPostsSummary();

  return (
    <div className="flex w-full flex-col bg-bg">
      <header className="flex items-center justify-between border-b border-border px-5 pt-2 pb-4">
        <div className="flex items-baseline font-display text-[26px] leading-[110%] tracking-tight">
          <span className="text-text">mini</span>
          <span className="text-accent">-</span>
          <span className="text-text">blog</span>
        </div>
        <div className="flex items-center gap-[18px]">
          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <circle cx="9" cy="9" r="5.5" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.6" />
            <path d="M13.2 13.2L17 17" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M3 6h14M3 11h14M3 16h9" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </header>

      <main className="flex flex-col">
        <div className="flex flex-col gap-[14px] px-5 pt-8 pb-[28px]">
          <div className="flex items-center gap-2">
            <div className="size-[6px] shrink-0 rounded-full bg-accent" />
            <p className="font-mono text-[11px] leading-[14px] font-medium tracking-wide text-accent uppercase">
              {summary.total} posts · {summary.updatedLabel}
            </p>
          </div>
          <h1 className="font-display text-[38px] leading-[110%] tracking-tight text-text">
            Notas curtas sobre código que roda em produção.
          </h1>
        </div>

        <div className="flex flex-col px-5">
          <article className="flex flex-col overflow-clip rounded-lg border border-border-strong bg-surface">
            <div className="relative h-[200px] shrink-0 bg-[#16201A]">
              <Image
                src={featured.cover}
                alt={featured.coverAlt}
                fill
                sizes="(max-width: 430px) 100vw, 390px"
                className="object-cover"
                priority
              />
              <p className="absolute top-[14px] left-[14px] rounded-full bg-accent px-[10px] py-[5px] font-mono text-[11px] leading-[14px] font-semibold tracking-[0.08em] text-[#07130B] uppercase">
                Destaque
              </p>
            </div>
            <div className="flex flex-col gap-3 px-5 pt-[22px] pb-6">
              <div className="flex items-center gap-[10px]">
                <span className="rounded-xs bg-accent-dim px-[9px] py-1 font-mono text-[11px] leading-[14px] font-medium text-accent">
                  {featured.tag}
                </span>
                <span className="font-mono text-[11px] leading-[14px] tracking-[0.1em] text-text-muted uppercase">
                  {featured.fullDate} · {featured.readingTime}
                </span>
              </div>
              <h2 className="font-display text-[30px] leading-[114%] tracking-tight text-text">
                {featured.title}
              </h2>
              <p className="font-sans text-[15px] leading-6 text-text-muted">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="border-b border-accent pb-[2px] font-sans text-sm leading-[18px] font-medium text-accent">
                  Ler mais
                </span>
                <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </article>
        </div>

        <div className="flex items-center gap-3 px-5 pt-[40px] pb-5">
          <h2 className="shrink-0 font-mono text-[11px] leading-[14px] font-medium tracking-[0.14em] text-text-muted uppercase">
            Todos os posts
          </h2>
          <div className="h-px grow bg-border-strong" />
        </div>

        <div className="flex flex-col gap-4 px-5">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex gap-[14px] rounded-md border border-border bg-surface p-[14px]"
            >
              <div className="relative size-24 shrink-0 overflow-clip rounded-sm bg-[#16201A]">
                <Image
                  src={post.cover}
                  alt={post.coverAlt}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex grow flex-col gap-[6px]">
                <p className="font-mono text-[11px] leading-[14px] tracking-[0.1em] text-text-muted uppercase">
                  {post.date} · {post.tag}
                </p>
                <h3 className="font-display text-[21px] leading-[116%] tracking-tight text-text">
                  {post.title}
                </h3>
                <p className="font-sans text-[13px] leading-5 text-text-muted">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-[44px] flex flex-col gap-5 border-t border-border bg-surface px-5 pt-9 pb-10">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-[28px] leading-[114%] tracking-tight text-text">
              Um e-mail por semana, quando tem o que dizer
            </h2>
            <p className="font-sans text-sm leading-[22px] text-text-muted">
              Sem spam. Cancele quando quiser.
            </p>
          </div>
          <form className="flex flex-col gap-[10px]">
            <input
              type="email"
              placeholder="voce@email.com"
              aria-label="Seu e-mail"
              className="rounded-sm border border-border-strong bg-bg px-4 py-[13px] font-mono text-sm leading-[18px] text-text placeholder:text-[#5F6A61]"
            />
            <button
              type="submit"
              className="flex items-center justify-center rounded-sm bg-accent px-6 py-[14px] font-sans text-sm leading-[18px] font-semibold text-[#07130B]"
            >
              Assinar
            </button>
          </form>
        </section>
      </main>

      <footer className="flex flex-col gap-[10px] border-t border-border px-5 pt-10 pb-[44px]">
        <div className="flex items-baseline font-display text-lg leading-[110%]">
          <span className="text-text">mini</span>
          <span className="text-accent">-</span>
          <span className="text-text">blog</span>
        </div>
        <p className="font-mono text-xs leading-5 text-text-muted">
          Escrito em markdown · sem tracker · © 2026
        </p>
        <nav className="flex gap-6 pt-[14px]">
          <a href="#" className="font-sans text-sm leading-[18px] text-text-muted">
            GitHub
          </a>
          <a href="#" className="font-sans text-sm leading-[18px] text-text-muted">
            Bluesky
          </a>
          <a href="#" className="font-sans text-sm leading-[18px] text-text-muted">
            RSS
          </a>
        </nav>
      </footer>
    </div>
  );
}
