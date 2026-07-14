import { ProductMedia } from "@/components/ui/product-media";

export function FeaturedWork({ locale, work }) {
  return (
    <section id="work" className="section-block section-rule">
      <div className="site-container featured-work">
        <ProductMedia src={work.image} alt={work[locale].alt} width={work.imageWidth} height={work.imageHeight} />
        <div>
          <p className="section-intro__eyebrow">Flagship work</p>
          <h2>{work[locale].title}</h2>
          <p>{work[locale].summary}</p>
        </div>
      </div>
    </section>
  );
}
