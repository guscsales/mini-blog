import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Esse post não existe
      </h1>
      <p className="mt-4 max-w-[52ch] text-muted">
        O endereço pode ter mudado, ou o texto ainda está como rascunho.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        Ver todos os posts
      </Link>
    </div>
  );
}
