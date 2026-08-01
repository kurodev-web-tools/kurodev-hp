import Image from "next/image";

export function ProductMedia({ src, alt, width, height, priority = false, className = "" }) {
  return (
    <div className={`product-media ${className}`.trim()}>
      <Image src={src} alt={alt} width={width} height={height} priority={priority} fetchPriority={priority ? "high" : undefined} sizes="(max-width: 767px) 92vw, (max-width: 1023px) 80vw, 56vw" />
    </div>
  );
}
