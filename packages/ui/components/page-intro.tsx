/** Abertura de página: marcador verde, sobrelinha e o título grande. */
export function PageIntro({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-[14px] px-5 pt-8 pb-[28px]">
      <div className="flex items-center gap-2">
        <div className="size-[6px] shrink-0 rounded-full bg-accent" />
        <p className="font-mono text-[11px] leading-[14px] font-medium tracking-wide text-accent uppercase">
          {eyebrow}
        </p>
      </div>
      <h1 className="font-display text-[38px] leading-[110%] tracking-tight text-text">
        {title}
      </h1>
    </div>
  );
}
