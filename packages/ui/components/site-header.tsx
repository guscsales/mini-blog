import { Button } from "./button";
import { Container } from "./container";
import { Logo } from "./logo";
import { MenuIcon, SearchIcon } from "./icons";

const navLinks = [
  { label: "Posts", href: "/", current: true },
  { label: "Tags", href: "#", current: false },
  { label: "Sobre", href: "#", current: false },
];

/**
 * Topo do blog. No mobile só marca e dois ícones; a partir de `lg` a navegação
 * completa aparece, com a chamada da newsletter.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <Container className="flex items-center justify-between pt-2 pb-4 lg:py-6">
        <a href="/" aria-label="Início">
          <Logo className="h-[26px] w-auto lg:h-[28px]" />
        </a>

        <div className="flex items-center gap-[18px] text-text-muted lg:hidden">
          <button type="button" aria-label="Buscar">
            <SearchIcon className="shrink-0" />
          </button>
          <button type="button" aria-label="Abrir menu">
            <MenuIcon className="shrink-0" />
          </button>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.current ? "page" : undefined}
              className={`font-sans text-sm leading-[18px] ${
                link.current ? "font-medium text-text" : "text-text-muted"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            className="font-mono text-xs leading-4 font-medium tracking-[0.1em] text-text-muted uppercase"
          >
            RSS
          </a>
          <Button size="sm">Newsletter</Button>
        </nav>
      </Container>
    </header>
  );
}
