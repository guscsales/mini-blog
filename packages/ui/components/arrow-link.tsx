import { ArrowRightIcon } from "./icons";

/** Link de leitura: texto sublinhado no accent seguido de uma seta. */
export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="flex w-fit items-center gap-2 text-accent">
      <span className="border-b border-accent pb-[2px] font-sans text-sm leading-[18px] font-medium">
        {children}
      </span>
      <ArrowRightIcon className="shrink-0" />
    </a>
  );
}
