import { Container } from "./container";

/**
 * Abertura da home. No mobile é só marcador, sobrelinha e título; a partir de
 * `lg` ganha uma coluna à direita com a descrição e os atalhos de tag.
 */
export function PageIntro({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  title: string;
  /** Texto da coluna da direita — só aparece no desktop. */
  description?: string;
  /** Filtros ou qualquer conteúdo abaixo da descrição. */
  aside?: React.ReactNode;
}) {
  return (
    <Container className="flex flex-col pt-8 pb-[28px] lg:flex-row lg:items-end lg:justify-between lg:gap-20 lg:pt-[88px] lg:pb-16">
      <div className="flex flex-col gap-[14px] lg:w-[700px] lg:shrink-0 lg:gap-5">
        <div className="flex items-center gap-2 lg:gap-[9px]">
          <div className="size-[6px] shrink-0 rounded-full bg-accent lg:size-[7px]" />
          <p className="font-mono text-[11px] leading-[14px] font-medium tracking-wide text-accent uppercase lg:text-xs lg:leading-4 lg:tracking-[0.14em]">
            {eyebrow}
          </p>
        </div>
        <h1 className="font-display text-[38px] leading-[110%] tracking-tight text-text lg:text-5xl lg:leading-[104%] lg:tracking-[-0.025em]">
          {title}
        </h1>
      </div>

      {description || aside ? (
        <div className="hidden lg:flex lg:w-[340px] lg:shrink-0 lg:flex-col lg:gap-[18px] lg:pb-2">
          {description ? (
            <p className="font-sans text-base leading-[26px] text-text-muted">
              {description}
            </p>
          ) : null}
          {aside}
        </div>
      ) : null}
    </Container>
  );
}
