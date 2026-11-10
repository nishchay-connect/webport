import type { Metadata } from "next";
import { getEntries } from "@/lib/content";
import { PageIntro, NotebookRow } from "@/components/primitives";

export const metadata: Metadata = { title: "Writing", description: "Notes and open questions about engineering, technology, philosophy, and the human experience." };

export default function WritingPage() {
  const notes = getEntries("writing");
  return <>
    <PageIntro index="05" category="NOTES / OPEN QUESTIONS" title={<>The thinking<br /><em>doesn&apos;t stop.</em></>} description="Notes, technical explanations, and questions I want to examine more closely. Not every thought here needs a conclusion." />
    <section className="shell notebook-page"><div className="notebook-page-heading"><span className="eyebrow">THE NOTEBOOK / {String(notes.length).padStart(2, "0")} ENTRIES</span><p>Initial entries are marked editorial starters to be rewritten in my own words before publication.</p></div><div className="notebook-list">{notes.map((entry) => <NotebookRow key={entry.slug} entry={entry} />)}</div></section>
    <section className="shell note-add"><span>+</span><p>More writing will find its way here.</p><small>New entries are added as MDX files in /content/writing.</small></section>
  </>;
}
