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
      <span className="border-b border-accent pb-[2px] font-sans text-sm leading-[18px] font-medium lg:pb-[3px] lg:text-[15px]">
        {children}
      </span>
      <ArrowRightIcon className="size-[15px] shrink-0 lg:size-4" />
    </a>
  );
}
