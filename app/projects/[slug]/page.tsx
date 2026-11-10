import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ArticleBody } from "@/components/article-body";
import { ProjectVisual } from "@/components/primitives";
import { getEntries, getEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("projects").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("projects", slug);
  return entry ? { title: entry.title, description: entry.summary } : { title: "Project not found" };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry("projects", slug);
  if (!entry) notFound();
  const entries = getEntries("projects");
  const index = entries.findIndex((p) => p.slug === slug);
  const next = entries[(index + 1) % entries.length];

  return <>
    <article className="detail-page shell">
      <div className="detail-top"><Link href="/projects" className="back-link"><ArrowLeft size={17} /> ALL PROJECTS</Link><span>CASE STUDY / 0{index + 1}</span></div>
      <div className="detail-heading"><div><p className="eyebrow">{entry.eyebrow}</p><h1>{entry.title}</h1><p className="detail-lead">{entry.summary}</p></div><div className="detail-meta"><span>STATUS</span><p>{entry.status}</p><span>AREAS</span><p>{entry.tags.join(" / ")}</p></div></div>
      <ProjectVisual slug={entry.slug} large />
      <div className="article-grid"><aside className="article-side"><div className="article-side-sticky"><p className="eyebrow">FIELD NOTES / PROJECT</p><p>Background, working approach, open challenges, and what still needs to be documented.</p><span className="article-side-rule" />{entry.tags.map((tag) => <span className="article-tag" key={tag}>{tag}</span>)}</div></aside><ArticleBody body={entry.body} /></div>
    </article>
    <div className="next-item shell"><div><span className="eyebrow">CONTINUE EXPLORING</span><Link href={`/projects/${next.slug}`}>{next.title} <ArrowRight size={27} strokeWidth={1.3} /></Link></div><Link href="/projects" className="text-link">All projects <ArrowUpRight size={18}/></Link></div>
  </>;
}
