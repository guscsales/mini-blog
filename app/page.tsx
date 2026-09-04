import Link from "next/link";
import { listContents } from "@/packages/factory/contents";
import { formatPublishedAt, toDateTimeAttribute } from "@/packages/utils";

function TagList({ tags }: { tags: string[] }) {
	if (tags.length === 0) return null;

	return (
		<ul className="flex flex-wrap gap-2">
			{tags.map((tag) => (
				<li
					key={tag}
					className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] lowercase tracking-wide text-muted"
				>
					{tag}
				</li>
			))}
		</ul>
	);
}

export default async function Home() {
	const contents = await listContents();
	const [featured, ...rest] = contents;

	const topics = [...new Set(contents.flatMap((content) => content.tags))];

	return (
		<div className="mx-auto max-w-3xl px-6">
			<section className="border-b border-border py-20 sm:py-28">
				<h1 className="max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
					Notas sobre código, escrita e o que fica no meio.
				</h1>
				<p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
					Textos curtos sobre Next.js, CSS e as decisões pequenas que definem um
					projeto.
				</p>
			</section>

			{contents.length === 0 ? (
				<section className="py-24">
					<h2 className="text-xl font-semibold tracking-tight text-foreground">
						Nenhum post publicado ainda
					</h2>
					<p className="mt-3 max-w-[52ch] text-muted">
						Crie um arquivo markdown em <code className="font-mono">.cms/</code>{" "}
						com <code className="font-mono">title</code> e{" "}
						<code className="font-mono">publishedAt</code> no frontmatter para
						ele aparecer aqui.
					</p>
				</section>
			) : (
				<>
					<section className="border-b border-border py-16">
						<Link href={`/posts/${featured.slug}`} className="group block">
							<h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-[2.125rem]">
								{featured.title}
							</h2>
							{featured.description ? (
								<p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-muted">
									{featured.description}
								</p>
							) : null}
							<p className="mt-6 font-mono text-xs text-muted">
								<time dateTime={toDateTimeAttribute(featured.publishedAt)}>
									{formatPublishedAt(featured.publishedAt)}
								</time>
								{` · ${featured.readingTimeInMinutes} min de leitura`}
							</p>
						</Link>
					</section>

					{rest.length > 0 ? (
						<section className="py-16">
							<h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
								Outros posts
							</h2>
							<ul className="mt-8 flex flex-col gap-10">
								{rest.map((content) => (
									<li key={content.slug}>
										<Link
											href={`/posts/${content.slug}`}
											className="group grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-8"
										>
											<p className="font-mono text-xs leading-6 text-muted sm:pt-1">
												<time
													dateTime={toDateTimeAttribute(content.publishedAt)}
												>
													{formatPublishedAt(content.publishedAt)}
												</time>
											</p>
											<div>
												<h3 className="text-xl font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent">
													{content.title}
												</h3>
												{content.description ? (
													<p className="mt-2 max-w-[58ch] leading-relaxed text-muted">
														{content.description}
													</p>
												) : null}
												<p className="mt-3 font-mono text-xs text-muted">
													{content.readingTimeInMinutes} min de leitura
												</p>
											</div>
										</Link>
									</li>
								))}
							</ul>
						</section>
					) : null}

					{topics.length > 0 ? (
						<section className="border-t border-border py-16">
							<div className="flex flex-col gap-6 sm:flex-row sm:items-baseline sm:gap-10">
								<h2 className="w-32 shrink-0 font-mono text-xs uppercase tracking-[0.14em] text-muted">
									Assuntos
								</h2>
								<TagList tags={topics} />
							</div>
						</section>
					) : null}
				</>
			)}
		</div>
	);
}
