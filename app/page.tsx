import {
  getFeaturedPost,
  getPosts,
  getPostsSummary,
  getTagFilters,
} from "@/packages/factories/services/posts";
import { Container } from "@/packages/ui/components/container";
import { FeaturedPostCard } from "@/packages/ui/components/featured-post-card";
import { NewsletterForm } from "@/packages/ui/components/newsletter-form";
import { PageIntro } from "@/packages/ui/components/page-intro";
import { PostCard } from "@/packages/ui/components/post-card";
import { SectionLabel } from "@/packages/ui/components/section-label";
import { SiteFooter } from "@/packages/ui/components/site-footer";
import { SiteHeader } from "@/packages/ui/components/site-header";
import { TagFilters } from "@/packages/ui/components/tag-filters";

export default function HomePage() {
  const featured = getFeaturedPost();
  const posts = getPosts();
  const summary = getPostsSummary();
  const tags = getTagFilters();

  return (
    <div className="flex w-full flex-col bg-bg">
      <SiteHeader />

      <main className="flex flex-col">
        <PageIntro
          eyebrow={`${summary.total} posts · ${summary.updatedLabel}`}
          title="Notas curtas sobre código que roda em produção."
          description={summary.description}
          aside={<TagFilters tags={tags} />}
        />

        <Container>
          <FeaturedPostCard post={featured} />
        </Container>

        <Container className="pt-10 pb-5 lg:pt-20 lg:pb-7">
          <SectionLabel trailing={summary.year}>Todos os posts</SectionLabel>
        </Container>

        <Container className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Container>

        <div className="mt-[44px] lg:mt-24">
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
