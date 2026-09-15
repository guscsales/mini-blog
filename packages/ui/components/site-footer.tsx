import { Logo } from "./logo";

const links = [
  { label: "GitHub", href: "#" },
  { label: "Bluesky", href: "#" },
  { label: "RSS", href: "#" },
];

/** Rodapé: marca, aviso de como o blog é feito e os links externos. */
export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-[10px] border-t border-border px-5 pt-10 pb-[44px]">
      <Logo height={20} />
      <p className="font-mono text-xs leading-5 text-text-muted">
        Escrito em markdown · sem tracker · © 2026
      </p>
      <nav className="flex gap-6 pt-[14px]">
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
    </footer>
  );
}
