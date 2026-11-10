import type { Metadata } from "next";
import { PageIntro } from "@/components/primitives";
import { ContactOptions } from "@/components/contact-options";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Nishchay about ideas, questions, engineering, or collaboration." };

export default function ContactPage() {
  return <>
    <PageIntro index="07" category="CONTACT / CONNECT" title={<>Good questions<br />start <em>conversations.</em></>} description="If you're exploring something interesting, working on a thoughtful problem, or want to exchange ideas, I'd be glad to connect." />
    <section className="shell contact-page-grid"><div className="contact-intro"><p className="eyebrow">REACH OUT</p><h2>Open to<br /><em>ideas.</em></h2><p>I especially enjoy conversations across disciplines—where technical questions meet real-world needs or bigger questions about the world.</p><p className="small-muted">No contact address or profile URL was supplied for this version. Add them in <code>lib/site.ts</code> to activate the links automatically.</p></div><ContactOptions /></section>
    <div className="shell contact-postscript"><span>PS.</span><p>I'm still learning. Interesting questions are always welcome.</p></div>
  </>;
}
