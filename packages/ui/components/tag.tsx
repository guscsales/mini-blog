/** Categoria do post, em verde sobre o accent escurecido. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-xs bg-accent-dim px-[9px] py-1 font-mono text-[11px] leading-[14px] font-medium text-accent">
      {children}
    </span>
  );
}

/** Selo sólido sobre a capa — o destaque da listagem. */
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-accent px-[10px] py-[5px] font-mono text-[11px] leading-[14px] font-semibold tracking-[0.08em] text-[#07130B] uppercase">
      {children}
    </span>
  );
}
