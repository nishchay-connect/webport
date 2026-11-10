import type { Metadata } from "next";
import { getEntries } from "@/lib/content";
import { PageIntro, ProjectVisual } from "@/components/primitives";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Projects", description: "Projects, prototypes, and experiments across AI, software, healthcare, and sensor engineering." };

export default function ProjectsPage() {
  const projects = getEntries("projects");
  return <>
    <PageIntro index="03" category="WORK / EXPERIMENTS" title={<>Things I&apos;m<br /><em>working through.</em></>} description="From emerging ideas to working prototypes. These case studies separate what exists from what is still being explored." />
    <section className="shell project-gallery">
      {projects.map((project, index) => (
        <Link className="gallery-item" href={`/projects/${project.slug}`} key={project.slug}>
          <ProjectVisual slug={project.slug} />
          <div className="gallery-info"><div><p className="eyebrow">0{index + 1} / {project.eyebrow}</p><h2>{project.title}</h2><p>{project.summary}</p><span className="gallery-status">{project.status}</span></div><ArrowUpRight className="gallery-arrow" size={25} strokeWidth={1.3} /></div>
        </Link>
      ))}
    </section>
    <section className="shell gallery-closing"><span>THIS INDEX IS INTENTIONALLY INCOMPLETE.</span><p>Each project changes as the thinking, building, and evidence change. The notes will too.</p></section>
  </>;
}
