import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { ContentEntry } from "@/lib/content";

export function SectionHead({ number, label, title, desc, href, linkText = "View all" }: {
  number: string; label: string; title: ReactNode; desc?: string; href?: string; linkText?: string;
}) {
  return (
    <div className="section-head">
      <div className="section-kicker"><span className="kicker-number">{number}</span><span>{label}</span></div>
      <div className="section-head-main">
        <div><h2 className="section-heading">{title}</h2>{desc && <p className="section-description">{desc}</p>}</div>
        {href && <Link href={href} className="text-link">{linkText} <ArrowUpRight size={18} strokeWidth={1.5} /></Link>}
      </div>
    </div>
  );
}

export function PageIntro({ index, category, title, description, right }: {
  index: string; category: string; title: ReactNode; description: string; right?: ReactNode;
}) {
  return (
    <section className="page-intro shell">
      <div className="page-intro-meta"><span>{index} / 07</span><span>{category}</span></div>
      <div className="page-intro-grid">
        <div><h1 className="page-title">{title}</h1><p className="page-description">{description}</p></div>
        <div className="page-intro-aside">{right || <span className="page-deco" aria-hidden="true">✳</span>}</div>
      </div>
    </section>
  );
}

const visualLabels: Record<string, string> = {
  "ami": "01 / PEOPLE + SYSTEMS",
  "team-plasmonic": "02 / MATTER + SIGNAL",
  "ai-experiments": "03 / MODEL + METHOD",
  "software-engineering": "04 / BUILD + LEARN",
};

export function ProjectVisual({ slug, large = false }: {slug: string; large?: boolean}) {
  return (
    <div className={`project-visual project-visual-${slug} ${large ? "project-visual-large" : ""}`} aria-hidden="true">
      <div className="visual-hairline visual-hairline-x" />
      <div className="visual-hairline visual-hairline-y" />
      <div className="visual-orbit visual-orbit-a" />
      <div className="visual-orbit visual-orbit-b" />
      <div className="visual-orbit visual-orbit-c" />
      <span className="visual-core" />
      <span className="visual-corner visual-corner-a">+</span>
      <span className="visual-corner visual-corner-b">⌁</span>
      <span className="visual-caption">{visualLabels[slug] || "INDEX / WORK"}</span>
    </div>
  );
}

export function ProjectRow({ entry, number }: { entry: ContentEntry; number: string }) {
  return (
    <Link href={`/projects/${entry.slug}`} className="project-row">
      <div className="project-row-index">{number} <span className="project-row-dash">—</span></div>
      <div className="project-row-text"><h3>{entry.title}</h3><p>{entry.summary}</p></div>
      <div className="project-row-type">{entry.eyebrow}</div>
      <ArrowUpRight className="project-row-arrow" size={26} strokeWidth={1.2} />
    </Link>
  );
}

export function NotebookRow({ entry }: { entry: ContentEntry }) {
  return (
    <Link href={`/writing/${entry.slug}`} className="notebook-row">
      <span className="notebook-meta">{entry.eyebrow}</span>
      <div><h3>{entry.title}</h3><p>{entry.summary}</p><span className="note-status">{entry.status}</span></div>
      <ArrowRight className="notebook-arrow" size={21} strokeWidth={1.4} />
    </Link>
  );
}

export function SmallLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="text-link" href={href}>{children}<ArrowUpRight size={16} strokeWidth={1.4} /></Link>;
}
