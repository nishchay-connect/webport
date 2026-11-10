import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/primitives";
import { initiatives } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = { title: "Initiatives", description: "Communities and initiatives that bring people together around engineering and chess." };

export default function InitiativesPage() {
  return <>
    <PageIntro index="06" category="PEOPLE / INITIATIVES" title={<>Things we build<br /><em>together.</em></>} description="Sometimes the most useful thing to build isn't software. It's a community where people can connect, learn, and start something new." />
    <section className="shell initiatives-list">
      {initiatives.map((initiative) => <article className="initiative-block" key={initiative.title}><div className="initiative-index"><span>{initiative.number} / COMMUNITY</span><span className="initiative-decoration" aria-hidden="true">{initiative.number === "01" ? "✳" : "♞"}</span></div><div className="initiative-content"><span className="eyebrow">{initiative.subtitle}</span><h2>{initiative.title}</h2><p>{initiative.description}</p><div className="initiative-involvement"><span className="eyebrow">INVOLVEMENT</span><span>{initiative.involvement}</span></div><div className="initiative-to-add"><span>TO DOCUMENT</span>{initiative.next}</div></div></article>)}
    </section>
    <section className="shell initiative-outro"><span className="eyebrow">THE BIGGER PICTURE</span><p>A strong engineering culture grows from people sharing knowledge, initiative, failures, and a willingness to try.</p><Link href="/contact" className="text-link">Start a conversation <ArrowUpRight size={18}/></Link></section>
  </>;
}
