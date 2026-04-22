import { ProjectCard } from "@/components/ui/project-card";
import { PageHeader } from "@/components/ui/page-header";
import { toolProjects } from "@/lib/site-data";

const title = "Tools | kurodev";
const description = "実制作の軽量PWAと、準備中の業務支援ツールを整理しています。";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/tool"
  },
  openGraph: {
    title,
    description,
    url: "/tool"
  },
  twitter: {
    title,
    description
  }
};

export default function ToolPage() {
  return (
    <>
      <PageHeader
        icon="terminal"
        title="Tools"
        description="実制作の軽量PWAと、準備中の業務支援ツールを整理しています。"
      />

      <section className="grid gap-6 xl:grid-cols-3">
        {toolProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>

      <section className="grid gap-10 border-t border-[var(--border)] pt-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:items-start">
        <div className="max-w-2xl">
          <p className="section-kicker">release policy</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--text-soft)]">
            <p>未公開のものを完成品として見せず、構想中や準備中の状態が分かる形で扱います。</p>
            <p>実制作物は匿名化し、公開できる粒度になったものから段階的に掲載します。</p>
          </div>
        </div>
        <div className="border-t border-[var(--border)] pt-4 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
          <p className="section-kicker">next wave</p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--text-soft)]">
            <li>配信ワークフロー支援</li>
            <li>問い合わせ整理コンソール</li>
            <li>小規模業務フローの軽量ツール化</li>
          </ul>
        </div>
      </section>
    </>
  );
}
