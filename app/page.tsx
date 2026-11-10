import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { getEntries } from "@/lib/content";
import { SectionHead, ProjectRow, NotebookRow } from "@/components/primitives";
import { ContactOptions } from "@/components/contact-options";

export default function HomePage() {
  const projects = getEntries("projects").filter((entry) => entry.featured);
  const notes = getEntries("writing").filter((entry) => entry.featured).slice(0, 2);

  return (
    <>
      <section className="home-hero shell">
        <div className="hero-meta"><span><i className="meta-square" /> A PERSONAL INDEX</span><span>ENGINEERING / IDEAS / EVERYTHING BETWEEN</span></div>
        <div className="hero-main">
          <div className="hero-copy">
            <span className="hero-small-label">HELLO, I'M NISHCHAY <span className="small-star">✳</span></span>
            <h1>Some questions<br />don&apos;t fit inside<br /><em>a single field.</em></h1>
            <div className="hero-bottom-copy">
              <p>Computer science undergraduate. Builder of things. Curious about the systems we create—and the world they try to explain.</p>
              <Link href="/about" className="round-arrow" aria-label="More about Nishchay"><ArrowUpRight size={27} strokeWidth={1.2} /></Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-marker hero-art-marker-top">FIG. 001 <span> / A WORK IN PROGRESS</span></div>
            <div className="hero-art-frame">
              <div className="hero-art-circle hero-art-circle-1" />
              <div className="hero-art-circle hero-art-circle-2" />
              <div className="hero-art-circle hero-art-circle-3" />
              <div className="hero-art-crosshair horizontal" />
              <div className="hero-art-crosshair vertical" />
              <div className="hero-art-center"><span className="hero-art-dot" /><span>ONGOING<br />EXPLORATION</span></div>
              <span className="hero-tick tick-a">N 01°</span>
              <span className="hero-tick tick-b">∞</span>
              <span className="hero-tick tick-c">C / 07</span>
            </div>
            <div className="hero-art-marker hero-art-marker-bottom"><span>CURIOSITY AS METHOD</span><span>↗</span></div>
          </div>
        </div>
        <div className="hero-foot"><span>BASED AT CENTRAL UNIVERSITY OF RAJASTHAN, INDIA</span><a href="#premise" className="hero-scroll">SCROLL TO EXPLORE <ArrowDown size={15} /></a><span>00 : 07</span></div>
      </section>

      <section className="premise-section" id="premise">
        <div className="shell premise-grid">
          <div className="side-label"><span className="accent-cross">✳</span> 01 / THE PREMISE</div>
          <div className="premise-content">
            <p className="premise-quote">I like to understand <span>why things work</span> before asking what else they might become.</p>
            <div className="premise-sub"><p>My starting point is computer science, especially AI and software engineering. But the questions I find most interesting often lead into healthcare, materials, biology, robotics, and philosophy.</p><Link href="/about" className="text-link">More about me <ArrowUpRight size={18} /></Link></div>
          </div>
        </div>
      </section>

      <section className="section-space shell work-section">
        <SectionHead number="02" label="SELECTED WORK" title={<>Ideas, in <em>progress.</em></>} desc="Some are products, some are investigations. All are works in progress, documented as honestly as possible." href="/projects" linkText="All projects" />
        <div className="project-list">{projects.map((entry, i) => <ProjectRow key={entry.slug} entry={entry} number={`0${i + 1}`} />)}</div>
        <div className="work-tail"><span>NO FINISHED STORY REQUIRED.</span><Link href="/projects/software-engineering" className="text-link">Other engineering work <MoveUpRight size={17} /></Link></div>
      </section>

      <section className="orbit-section">
        <div className="shell orbit-grid">
          <div className="orbit-left"><span className="section-kicker"><span className="kicker-number">03</span> CURRENT CURIOSITIES</span><h2>On my<br /><em>radar.</em></h2><p>These are directions I keep returning to—not claims of expertise or finished work.</p><Link href="/explore" className="text-link">Explore the questions <ArrowUpRight size={18} /></Link></div>
          <div className="radar-list">
            <Link href="/projects/ami"><span className="radar-number">01</span><span>AI that supports better healthcare interactions</span><ArrowUpRight size={19} /></Link>
            <Link href="/projects/team-plasmonic"><span className="radar-number">02</span><span>When materials become sensors</span><ArrowUpRight size={19} /></Link>
            <Link href="/explore"><span className="radar-number">03</span><span>Intelligence beyond software alone</span><ArrowUpRight size={19} /></Link>
            <Link href="/explore"><span className="radar-number">04</span><span>Memory, consciousness, and existence</span><ArrowUpRight size={19} /></Link>
            <div className="radar-note">THE LIST WILL KEEP CHANGING. <span>↗</span></div>
          </div>
        </div>
      </section>

      <section className="section-space shell writing-section">
        <SectionHead number="04" label="NOTES FROM THE MARGINS" title={<>A space to <em>think.</em></>} desc="Technical notes, half-formed questions, and thoughts worth coming back to. The first entries are clearly marked editorial starters." href="/writing" linkText="Open the notebook" />
        <div className="notebook-list">{notes.map((entry) => <NotebookRow key={entry.slug} entry={entry} />)}</div>
      </section>

      <section className="community-section"><div className="shell community-grid"><div><p className="eyebrow">05 / PEOPLE & COMMUNITIES</p><h2>Building isn&apos;t<br />always <em>solitary.</em></h2></div><div className="community-right"><p>Beyond individual projects, I care about creating places for other people to learn, meet, and make things happen.</p><div className="community-links"><Link href="/initiatives"><span>ENAC <small>/ ENGINEERING COMMUNITY</small></span><ArrowUpRight size={20} /></Link><Link href="/initiatives"><span>B² Chess Club <small>/ CHESS COMMUNITY</small></span><ArrowUpRight size={20} /></Link></div><Link href="/initiatives" className="text-link">The initiatives <ArrowUpRight size={18} /></Link></div></div></section>

      <section className="section-space shell end-section"><div className="end-lead"><span className="eyebrow">06 / THE OPEN DOOR</span><h2>There&apos;s always<br /><em>another question.</em></h2><p>If you're working on something interesting—or simply have a good question—I'd be glad to hear about it.</p><Link href="/contact" className="button-line">START A CONVERSATION <ArrowUpRight size={20} strokeWidth={1.4} /></Link></div><div className="end-aside"><p className="eyebrow">FIND ME ELSEWHERE</p><ContactOptions compact /></div></section>
    </>
  );
}
