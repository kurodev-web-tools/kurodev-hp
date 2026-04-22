import { ContactForm } from "@/components/contact-form";
import { BentoCard } from "@/components/ui/bento-card";
import { PageHeader } from "@/components/ui/page-header";
import { contactChannels, pricingItems } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        icon="mail"
        title="Contact & Pricing"
        description="Web制作、改善運用、軽量ツール化の相談内容を整理する入口です。"
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <div className="order-2 space-y-6 xl:order-1">
          <ContactForm />
          <BentoCard>
            <p className="section-kicker">相談しやすい内容</p>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-[var(--text-soft)] md:grid-cols-2">
              {contactChannels.map((item) => (
                <li key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--panel-muted)] px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </BentoCard>
        </div>

        <div className="order-1 space-y-4 xl:order-2">
          <BentoCard>
            <p className="section-kicker">budget guide</p>
            <h2 className="mt-3 text-lg font-semibold text-[var(--text)]">新規サイトは HP-portal のプランを基準に確認できます。</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
              テンプレート活用の Light plan から、構成調整を含む制作まで、まずはプラン側で目安を確認できます。
            </p>
            <a
              href="https://templates.kuro-lab.com/plans"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-md border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--accent)] transition hover:border-[var(--border-strong)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              HP-portalのプランを見る
            </a>
          </BentoCard>
          {pricingItems.map((item) => (
            <BentoCard key={item.title}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">{item.body}</p>
                </div>
                <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)]">
                  {item.price}
                </span>
              </div>
            </BentoCard>
          ))}
        </div>
      </section>
    </>
  );
}
