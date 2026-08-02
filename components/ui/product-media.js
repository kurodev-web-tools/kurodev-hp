import Image from "next/image";

const productMediaSizes = "(max-width: 767px) 92vw, (max-width: 1023px) 80vw, 56vw";
const responsiveProductMediaWidths = [640, 1024, 1600];

export function ProductMedia({ src, alt, width, height, priority = false, className = "" }) {
  const modernSrcSet = src.startsWith("/images/kuro-stream-kit/")
    ? responsiveProductMediaWidths
        .map((responsiveWidth) => `${src.replace(/\.png$/, "")}-${responsiveWidth}.webp ${responsiveWidth}w`)
        .join(", ")
    : "";

  return (
    <div className={`product-media ${className}`.trim()}>
      <picture>
        {modernSrcSet ? <source type="image/webp" srcSet={modernSrcSet} sizes={productMediaSizes} /> : null}
        <Image src={src} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} sizes={productMediaSizes} />
      </picture>
    </div>
  );
}
