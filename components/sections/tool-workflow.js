import { localizedTool } from "@/lib/content/tool-content.mjs";
import { SectionIntro } from "@/components/ui/section-intro";

export function ToolWorkflow({ locale, copy, tools }) {
  return (
    <section className="section-block section-rule tool-workflow" aria-labelledby="tool-workflow-title">
      <div className="site-container tool-workflow__layout">
        <div id="tool-workflow-title">
          <SectionIntro eyebrow={copy.eyebrow} title={copy.title} titleLines={copy.titleLines} body={copy.body} />
        </div>
        <ol className="tool-workflow__steps">
          {tools.map((tool, index) => {
            const item = localizedTool(tool, locale);
            return (
              <li key={tool.id}>
                <span className="tool-workflow__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.summary}</small>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
