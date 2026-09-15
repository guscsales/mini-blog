import { Container } from "./container";
import { Logo } from "./logo";

const links = [
  { label: "GitHub", href: "#" },
  { label: "Bluesky", href: "#" },
  { label: "RSS", href: "#" },
];

/** Rodapé: empilhado no mobile, marca e links nas pontas no desktop. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-[10px] pt-10 pb-[44px] lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:pt-12 lg:pb-16">
        <div className="flex flex-col gap-[10px]">
          <Logo className="h-5 w-auto lg:h-[22px]" />
          <p className="font-mono text-xs leading-5 text-text-muted">
            Escrito em markdown · sem tracker · © 2026
          </p>
        </div>
        <nav className="flex gap-6 pt-[14px] lg:gap-8 lg:pt-0">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-sm leading-[18px] text-text-muted"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
