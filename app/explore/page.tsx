import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/primitives";
import { explorationAreas } from "@/lib/site";

export const metadata: Metadata = { title: "Explore", description: "An open map of interests, questions, and disciplines that Nishchay is exploring." };

export default function ExplorePage() {
  return <>
    <PageIntro index="04" category="CURIOSITY / OUTSIDE THE LINES" title={<>An unfinished<br /><em>map of interests.</em></>} description="Not a list of expertise. A collection of territories I want to understand better, and the questions pulling me toward them." />
    <section className="shell explore-intro"><span className="eyebrow">A NOTE ON CURIOSITY</span><p>Computer science is a starting point. The world doesn't organize itself by university department, and neither do the most interesting problems.</p></section>
    <section className="shell explore-grid">
      {explorationAreas.map((area) => <article className="explore-item" key={area.id}><div className="explore-item-top"><span>{area.id} / 06</span><span className="explore-symbol">↗</span></div><p className="eyebrow">{area.kind}</p><h2>{area.name}</h2><p className="explore-description">{area.description}</p><div className="explore-questions"><span className="eyebrow">QUESTIONS THAT INTEREST ME</span>{area.questions.map((question) => <p key={question}>{question}</p>)}</div></article>)}
    </section>
    <section className="shell explore-outro"><span className="large-asterisk" aria-hidden="true">✳</span><div><h2>Curiosity is not<br /><em>a credential.</em></h2><p>Being interested in a field means there's work to do: reading, asking, experimenting, and learning from people who know more.</p><Link href="/writing" className="text-link">Follow the thinking <ArrowUpRight size={18}/></Link></div></section>
  </>;
}
