import { Logo } from "./logo";
import { MenuIcon, SearchIcon } from "./icons";

/** Topo do blog: marca à esquerda, busca e menu à direita. */
export function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border px-5 pt-2 pb-4">
      <a href="/" aria-label="Início">
        <Logo height={26} />
      </a>
      <div className="flex items-center gap-[18px] text-text-muted">
        <button type="button" aria-label="Buscar">
          <SearchIcon className="shrink-0" />
        </button>
        <button type="button" aria-label="Abrir menu">
          <MenuIcon className="shrink-0" />
        </button>
      </div>
    </header>
  );
}
