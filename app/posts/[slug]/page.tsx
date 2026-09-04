import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	getContentBySlug,
	listContents,
	toContentBodyHtml,
} from "@/packages/factory/contents";
import { formatPublishedAt, toDateTimeAttribute } from "@/packages/utils";

export async function generateStaticParams() {
	const contents = await listContents();

	return contents.map((content) => ({ slug: content.slug }));
}

export async function generateMetadata(
	props: PageProps<"/posts/[slug]">,
): Promise<Metadata> {
	const { slug } = await props.params;
	const content = await getContentBySlug(slug);

	if (!content) return {};

	return {
		title: content.title,
		description: content.description ?? undefined,
	};
}

export default async function ContentPage(props: PageProps<"/posts/[slug]">) {
	const { slug } = await props.params;
	const content = await getContentBySlug(slug);

	if (!content) notFound();

	const bodyHtml = await toContentBodyHtml(content.body);

	return (
		<article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
			<Link
				href="/"
				className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
			>
				Voltar
			</Link>

			<header className="mt-10 border-b border-border pb-10">
				<h1 className="max-w-[24ch] text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-[2.5rem]">
					{content.title}
				</h1>
				{content.description ? (
					<p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted">
						{content.description}
					</p>
				) : null}
				<p className="mt-6 font-mono text-xs text-muted">
					<time dateTime={toDateTimeAttribute(content.publishedAt)}>
						{formatPublishedAt(content.publishedAt)}
					</time>
					{` · ${content.readingTimeInMinutes} min de leitura`}
					{content.author ? ` · ${content.author}` : null}
				</p>
			</header>

			<div
				className="prose mt-12"
				dangerouslySetInnerHTML={{ __html: bodyHtml }}
			/>

			{content.tags.length > 0 ? (
				<ul className="mt-16 flex flex-wrap gap-2 border-t border-border pt-8">
					{content.tags.map((tag) => (
						<li
							key={tag}
							className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] lowercase tracking-wide text-muted"
						>
							{tag}
						</li>
					))}
				</ul>
			) : null}
		</article>
	);
}
