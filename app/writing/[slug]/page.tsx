import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ArticleBody } from "@/components/article-body";
import { getEntries, getEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("writing").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("writing", slug);
  return entry ? {
    title: entry.title,
    description: entry.summary,
    // Sample notes should not be indexed as published personal essays.
    ...(entry.status.toLowerCase().includes("starter") ? { robots: { index: false, follow: true } } : {}),
  } : { title: "Note not found" };
}

export default async function WritingDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry("writing", slug);
  if (!entry) notFound();
  const entries = getEntries("writing");
  const index = entries.findIndex((p) => p.slug === slug);
  const next = entries[(index + 1) % entries.length];

  return <>
    <article className="detail-page detail-writing shell"><div className="detail-top"><Link href="/writing" className="back-link"><ArrowLeft size={17} /> ALL NOTES</Link><span>NOTEBOOK / 0{index + 1}</span></div><div className="writing-title-block"><p className="eyebrow">{entry.eyebrow}</p><h1>{entry.title}</h1><p className="detail-lead">{entry.summary}</p><span className="writing-status">{entry.status}</span></div><div className="article-grid"><aside className="article-side"><div className="article-side-sticky"><p className="eyebrow">IN THE MARGINS</p><p>Ideas to revisit, test, and develop.</p><span className="article-side-rule" />{entry.tags.map((tag) => <span className="article-tag" key={tag}>{tag}</span>)}</div></aside><ArticleBody body={entry.body} /></div></article>
    <div className="next-item shell"><div><span className="eyebrow">ANOTHER NOTE</span><Link href={`/writing/${next.slug}`}>{next.title} <ArrowRight size={26}/></Link></div></div>
  </>;
}
