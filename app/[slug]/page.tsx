import { notFound } from "next/navigation";

import { getFeaturedPost, getPostBySlug } from "@/packages/factories/services/posts";
import { AuthorByline } from "@/packages/ui/components/author-byline";
import { BackToListLink } from "@/packages/ui/components/back-to-list-link";
import { Container } from "@/packages/ui/components/container";
import { PostCover } from "@/packages/ui/components/post-cover";
import { PostHero } from "@/packages/ui/components/post-hero";
import { PostNav } from "@/packages/ui/components/post-nav";
import { PostTags } from "@/packages/ui/components/post-tags";
import { ReadingProgressBar } from "@/packages/ui/components/reading-progress-bar";
import { SiteFooter } from "@/packages/ui/components/site-footer";
import { SiteHeader } from "@/packages/ui/components/site-header";
import { Markdown } from "@/packages/ui/components/markdown/markdown";

export async function generateStaticParams() {
  return [{ slug: getFeaturedPost().slug }];
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="flex w-full flex-col bg-bg">
      <SiteHeader />
      <ReadingProgressBar />

      <main className="flex flex-col gap-6 pt-7 pb-10 lg:gap-9 lg:pt-[72px] lg:pb-16">
        <Container>
          <PostHero post={post} />
        </Container>

        <Container>
          <PostCover post={post} />
        </Container>

        <Container className="mx-auto flex w-full flex-col gap-6 lg:max-w-[47.5rem] lg:gap-7">
          <Markdown source={post.content} />

          <div className="h-px bg-border" />

          <PostTags tags={post.tags} />
        </Container>

        <Container>
          <BackToListLink href="/" />
        </Container>

        <Container>
          <PostNav previousPost={post.previousPost} nextPost={post.nextPost} />
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
