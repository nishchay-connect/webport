import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/primitives";

export const metadata: Metadata = { title: "About", description: "A little more about Nishchay, his approach to learning, engineering, and the questions behind the work." };

export default function AboutPage() {
  return <>
    <PageIntro index="02" category="PERSON / PERSPECTIVE" title={<>A little more<br /><em>about me.</em></>} description="A work in progress, in more ways than one." />
    <section className="shell about-opening">
      <div className="about-index"><span className="eyebrow">BACKGROUND / 01</span><span className="about-index-mark">N<span>✳</span></span></div>
      <div className="about-introduction"><p>I'm Nishchay, a Computer Science undergraduate at the <strong>Central University of Rajasthan</strong>, India.</p><p>Engineering is where much of my attention goes: AI, machine learning, software, and the fundamentals behind the systems we use. But I don't think interesting questions come neatly separated by discipline.</p><p>Sometimes a problem takes me into healthcare. Sometimes into materials, sensing, biology, or robotics. Other times, the questions aren't about building at all—they're about consciousness, memory, existence, or what it means to understand something.</p></div>
    </section>
    <section className="shell about-chapters">
      <div className="about-chapter"><div className="chapter-label"><span>01</span><span>HOW I LEARN</span></div><div><h2>From principles<br />to <em>practice.</em></h2><p>I'm interested in understanding how things work, not only in knowing which tools to use. That means studying foundations, making small experiments, testing assumptions, and being willing to discover that a first approach was wrong.</p><p>I value useful engineering as much as theoretical understanding. Ideally, they should keep challenging each other.</p></div></div>
      <div className="about-chapter"><div className="chapter-label"><span>02</span><span>WHY IT SPREADS</span></div><div><h2>The boundaries<br />are <em>interesting.</em></h2><p>Some of the problems I'm drawn to don't fit inside a single domain. AI in healthcare depends on understanding people and clinical realities. A sensing device brings together materials, electronics, and design. Robotics asks software to deal with the physical world.</p><p>I'm not an expert in all of these areas. I'm exploring them because their intersections seem worth understanding.</p></div></div>
      <div className="about-chapter"><div className="chapter-label"><span>03</span><span>THE LONGER VIEW</span></div><div><h2>Ambitious questions.<br /><em>Patient work.</em></h2><p>In the long run, I'd like to contribute to technologies that expand what people can do and what we understand about the world. Right now, that ambition takes a much simpler form: learn deeply, build carefully, collaborate well, and keep asking better questions.</p><p>There is still a great deal I don't know. That's part of what makes the work compelling.</p></div></div>
    </section>
    <section className="shell about-last"><div><span className="eyebrow">OUTSIDE THE TECHNICAL FRAME</span><h2>Not everything worth<br />thinking about needs<br /><em>an application.</em></h2></div><div><p>Human life, consciousness, the nature of God, memory, and existence are subjects I want to keep exploring without pretending to have settled answers.</p><p className="small-muted">This biography is a starting draft based on information shared for this site. Add the moments, books, experiences, and personal details that make it unmistakably yours.</p><Link href="/writing" className="text-link">Some questions, in writing <ArrowUpRight size={18} /></Link></div></section>
  </>;
}
