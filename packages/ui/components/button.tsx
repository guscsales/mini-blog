/** Botão principal: fundo accent, texto escuro. */
export function Button({
  children,
  type = "button",
  size = "md",
  className,
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  /** `sm` é o da navegação; `md`, o da chamada de newsletter. */
  size?: "sm" | "md";
  className?: string;
}) {
  const sizeClass = size === "sm" ? "px-[18px] py-[10px]" : "px-6 py-[14px]";

  return (
    <button
      type={type}
      className={`flex items-center justify-center rounded-sm bg-accent font-sans text-sm leading-[18px] font-semibold text-[#07130B] ${sizeClass} ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
