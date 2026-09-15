/** Campo de texto sobre o fundo da página, com borda mais marcada. */
export function Input({
  type = "text",
  placeholder,
  label,
  name,
}: {
  type?: "text" | "email";
  placeholder?: string;
  /** Rótulo acessível — o campo aparece sem label visível no layout. */
  label: string;
  name?: string;
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      aria-label={label}
      className="w-full rounded-sm border border-border-strong bg-bg px-4 py-[13px] font-mono text-sm leading-[18px] text-text placeholder:text-[#5F6A61]"
    />
  );
}
