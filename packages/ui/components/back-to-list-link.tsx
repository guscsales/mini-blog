import { ArrowLeftIcon } from "./icons";

/** Botão de voltar do rodapé do post, num contorno separado por uma régua acima. */
export function BackToListLink({ href }: { href: string }) {
  return (
    <div className="flex justify-center border-t border-border pt-7 lg:pt-10">
      <a
        href={href}
        className="flex items-center gap-[10px] rounded-sm border border-border-strong bg-surface px-5 py-[13px] lg:px-[22px]"
      >
        <ArrowLeftIcon className="size-[15px] shrink-0 text-accent lg:size-4" />
        <span className="font-sans text-sm leading-[18px] font-medium text-text lg:text-[15px]">
          Voltar para a listagem
        </span>
      </a>
    </div>
  );
}
