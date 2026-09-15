/** Botão principal: fundo accent, texto escuro. */
export function Button({
  children,
  type = "button",
  className,
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      className={`flex items-center justify-center rounded-sm bg-accent px-6 py-[14px] font-sans text-sm leading-[18px] font-semibold text-[#07130B] ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
