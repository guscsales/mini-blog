export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-12 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="text-sm text-foreground">Mini Blog</p>
        <p className="text-sm text-muted">
          Escrito em markdown, versionado no git.
        </p>
      </div>
    </footer>
  );
}
