import Image from "next/image";

/**
 * Capa de post. O fundo escuro aparece enquanto a imagem carrega e nas bordas
 * de recortes que não preenchem o quadro.
 */
export function CoverImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative shrink-0 overflow-clip bg-[#16201A] ${className ?? ""}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
    </div>
  );
}
