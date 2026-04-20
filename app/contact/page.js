import { ContactForm } from "@/components/contact-form";
import { SectionHeader } from "@/components/ui/section-header";
import { BentoCard } from "@/components/ui/bento-card";
import { contactChannels, pricingItems } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <>
      <section className="hero-surface panel-strong rounded-[34px] px-6 py-8 md:px-10 md:py-10">
        <SectionHeader
          eyebrow="contact"
          title="相談の入口を、重すぎない形で。"
          body="要件が完全に固まっていなくても問題ありません。今の状況、困っている点、急ぎ度が分かる範囲で共有してもらえれば、次の整理ポイントから一緒に詰めます。"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <div className="space-y-6">
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

        <div className="space-y-6">
          {pricingItems.map((item) => (
            <BentoCard key={item.title}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{item.body}</p>
                </div>
                <span className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--accent)]">
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
