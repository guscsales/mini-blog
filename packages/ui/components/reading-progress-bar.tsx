/** Régua decorativa abaixo do cabeçalho, só nas páginas de post. */
export function ReadingProgressBar() {
  return (
    <div className="flex h-[2px] shrink-0 bg-border">
      <div className="h-[2px] w-[140px] shrink-0 bg-accent lg:w-[430px]" />
    </div>
  );
}
