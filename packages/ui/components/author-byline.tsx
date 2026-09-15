import { getInitials } from "../../utils";

/** Avatar com iniciais, nome e bio do autor — a bio cresce a partir do `lg`. */
export function AuthorByline({
  name,
  bioShort,
  bioFull,
}: {
  name: string;
  bioShort: string;
  bioFull: string;
}) {
  return (
    <div className="flex items-center gap-[10px] border-t border-border pt-2 lg:gap-3 lg:border-0 lg:pt-0">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-dim lg:size-9">
        <span className="font-mono text-[13px] leading-4 font-semibold text-accent lg:text-sm lg:leading-[18px]">
          {getInitials(name)}
        </span>
      </div>
      <div className="flex flex-col gap-px">
        <p className="font-sans text-[13px] leading-4 font-medium text-text lg:text-sm lg:leading-[18px]">
          {name}
        </p>
        <p className="font-mono text-[11px] leading-[14px] text-text-muted lg:text-xs lg:leading-4">
          <span className="lg:hidden">{bioShort}</span>
          <span className="hidden lg:inline">{bioFull}</span>
        </p>
      </div>
    </div>
  );
}
