import {
  getFeaturedPost,
  getPosts,
  getPostsSummary,
} from "@/packages/factories/services/posts";
import { FeaturedPostCard } from "@/packages/ui/components/featured-post-card";
import { NewsletterForm } from "@/packages/ui/components/newsletter-form";
import { PageIntro } from "@/packages/ui/components/page-intro";
import { PostCard } from "@/packages/ui/components/post-card";
import { SectionLabel } from "@/packages/ui/components/section-label";
import { SiteFooter } from "@/packages/ui/components/site-footer";
import { SiteHeader } from "@/packages/ui/components/site-header";

export default function HomePage() {
  const featured = getFeaturedPost();
  const posts = getPosts();
  const summary = getPostsSummary();

  return (
    <div className="flex w-full flex-col bg-bg">
      <SiteHeader />

      <main className="flex flex-col">
        <PageIntro
          eyebrow={`${summary.total} posts · ${summary.updatedLabel}`}
          title="Notas curtas sobre código que roda em produção."
        />

        <div className="px-5">
          <FeaturedPostCard post={featured} />
        </div>

        <div className="px-5 pt-10 pb-5">
          <SectionLabel>Todos os posts</SectionLabel>
        </div>

        <div className="flex flex-col gap-4 px-5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-[44px]">
          <NewsletterForm
            title="Um e-mail por semana, quando tem o que dizer"
            description="Sem spam. Cancele quando quiser."
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
