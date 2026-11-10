"""Create a dependency-free static visual preview from the site's MDX content.

This is a QA aid for environments without an npm registry. The Next.js app
remains the canonical implementation; the preview is not used by Next.js.
Run: python scripts/build_preview.py /path/to/output
Then: python -m http.server 8765 -d /path/to/output
"""
from pathlib import Path
from html import escape
import re, shutil, sys
import yaml
import mistune

ROOT=Path(__file__).resolve().parents[1]
DEST=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else ROOT/'preview'
DEST.mkdir(parents=True,exist_ok=True)
css=(ROOT/'app/globals.css').read_text().replace('@import "tailwindcss";','')
(DEST/'styles.css').write_text(css)
shutil.copy2(ROOT/'public/icon.svg',DEST/'icon.svg')

def load(kind):
    docs=[]
    for file in (ROOT/'content'/kind).glob('*.mdx'):
        raw=file.read_text()
        m=re.match(r'^---\n(.*?)\n---\n(.*)$',raw,re.S)
        if not m: continue
        d=yaml.safe_load(m.group(1));d['slug']=file.stem;d['body']=m.group(2);docs.append(d)
    return sorted(docs,key=lambda d:d.get('order',99))
projects=load('projects');notes=load('writing')

def icon(name,sz=18):
    d={
      'up':'M7 17 17 7M8 7h9v9', 'right':'M5 12h14m-7-7 7 7-7 7',
      'down':'M12 5v14m-7-7 7 7 7-7', 'left':'M19 12H5m7 7-7-7 7-7',
      'menu':'M4 6h16M4 12h16M4 18h16','close':'M18 6 6 18M6 6l12 12',
      'github':'M9 19c-4 1-4-2-6-3m12 3v-3.7a3 3 0 0 0-1-2c3-.4 6-1.5 6-6A4.5 4.5 0 0 0 19 3a4 4 0 0 0-3 .8 13 13 0 0 0-8 0A4 4 0 0 0 5 3a4.5 4.5 0 0 0-1 3.3c0 4.5 3 5.6 6 6a3 3 0 0 0-1 2V19',
      'linkedin':'M4 9v11M4 4v.01M10 20v-11m0 5a4 4 0 0 1 8 0v6',
      'mail':'M3 5h18v14H3zM3 6l9 7 9-7'
    }[name]
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{sz}" height="{sz}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{d}"/></svg>'

def a(href,label,cls='text-link',ico='up'):
    return f'<a href="{href}" class="{cls}">{label} {icon(ico)}</a>'

def nav(active):
    links=[('/','Home'),('/about/','About'),('/projects/','Projects'),('/explore/','Explore'),('/writing/','Writing'),('/initiatives/','Initiatives'),('/contact/','Contact')]
    desktop=''.join(f'<a href="{h}" class="nav-link {"is-active" if h==active else ""}">{n}</a>' for h,n in links)
    mobile=''.join(f'<a href="{h}" class="mobile-nav-link"><span class="mono">0{i}</span><span>{n}</span>{icon("up",21)}</a>' for i,(h,n) in enumerate(links,1))
    return f'''<header class="site-header"><div class="nav-shell shell"><a href="/" class="brand" aria-label="Nishchay homepage"><span class="brand-mark">N<span class="brand-period">.</span></span><span class="brand-caption">NISHCHAY<span class="brand-caption-muted"> / INDEX</span></span></a><nav class="desktop-nav" aria-label="Main navigation">{desktop}</nav><div class="nav-end"><span class="availability"><span class="availability-dot"></span> CURRENTLY EXPLORING</span><button class="menu-toggle" aria-label="Open navigation menu" type="button" aria-expanded="false" aria-controls="mobile-menu">{icon('menu',22)}</button></div></div><nav id="mobile-menu" class="mobile-nav" aria-label="Mobile navigation" inert><div class="mobile-nav-inner shell"><p class="eyebrow">TABLE OF CONTENTS / 07</p>{mobile}</div></nav></header>'''

def footer():
    links=[('/about/','About'),('/projects/','Projects'),('/explore/','Explore'),('/writing/','Writing'),('/initiatives/','Initiatives'),('/contact/','Contact')]
    return f'''<footer class="site-footer"><div class="shell"><div class="footer-top"><div><p class="eyebrow"><span class="accent-cross">✳</span> AN OPEN-ENDED INDEX</p><h2>Still curious<span class="footer-period">.</span></h2><p class="footer-phrase">For conversations, collaborations, and questions worth exploring.</p>{a('/contact/','Get in touch','text-link text-link-large')}</div><div class="footer-right"><span class="eyebrow">DIRECTORY</span><div class="footer-nav">{''.join(f'<a href="{h}">{n}</a>' for h,n in links)}</div></div></div><div class="footer-bottom"><span>© 2026 Nishchay</span><span>Made as a place to keep learning.</span><a href="#top" class="back-top">BACK TO TOP {icon('up',14)}</a></div><p class="footer-signature" aria-hidden="true">NISHCHAY<span>↗</span></p></div></footer>'''

def pageintro(index,cat,title,desc):
    return f'<section class="page-intro shell"><div class="page-intro-meta"><span>{index} / 07</span><span>{cat}</span></div><div class="page-intro-grid"><div><h1 class="page-title">{title}</h1><p class="page-description">{desc}</p></div><div class="page-intro-aside"><span class="page-deco" aria-hidden="true">✳</span></div></div></section>'

def sectionhead(n,label,title,desc,link,linkname):
    return f'<div class="section-head"><div class="section-kicker"><span class="kicker-number">{n}</span><span>{label}</span></div><div class="section-head-main"><div><h2 class="section-heading">{title}</h2><p class="section-description">{desc}</p></div>{a(link,linkname)}</div></div>'

def projectrow(p,i):
    return f'<a href="/projects/{p["slug"]}/" class="project-row"><div class="project-row-index">0{i} <span class="project-row-dash">—</span></div><div class="project-row-text"><h3>{escape(p["title"])}</h3><p>{escape(p["summary"])}</p></div><div class="project-row-type">{escape(p["eyebrow"])}</div><span class="project-row-arrow">{icon("up",26)}</span></a>'

def note_row(p):
    return f'<a href="/writing/{p["slug"]}/" class="notebook-row"><span class="notebook-meta">{escape(p["eyebrow"])}</span><div><h3>{escape(p["title"])}</h3><p>{escape(p["summary"])}</p><span class="note-status">{escape(p["status"])}</span></div><span class="notebook-arrow">{icon("right",21)}</span></a>'

def contact(compact=False):
    return f'''<div class="contact-options {'contact-options-compact' if compact else ''}">'''+''.join(f'<div class="contact-option contact-option-empty"><span class="contact-option-icon">{icon(ic,20)}</span><span class="contact-option-copy"><strong>{nm}</strong><small>{lab}</small></span><span class="contact-pending">LINK TO ADD</span></div>' for nm,ic,lab in [('GitHub','github','Code, experiments, repositories'),('LinkedIn','linkedin','Professional updates and conversations'),('Email','mail','For a direct conversation')])+'</div>'

def visual(slug,large=False):
    labels={'ami':'01 / PEOPLE + SYSTEMS','team-plasmonic':'02 / MATTER + SIGNAL','ai-experiments':'03 / MODEL + METHOD','software-engineering':'04 / BUILD + LEARN'}
    return f'<div class="project-visual project-visual-{slug} {"project-visual-large" if large else ""}" aria-hidden="true"><div class="visual-hairline visual-hairline-x"></div><div class="visual-hairline visual-hairline-y"></div><div class="visual-orbit visual-orbit-a"></div><div class="visual-orbit visual-orbit-b"></div><div class="visual-orbit visual-orbit-c"></div><span class="visual-core"></span><span class="visual-corner visual-corner-a">+</span><span class="visual-corner visual-corner-b">⌁</span><span class="visual-caption">{labels.get(slug,"INDEX / WORK")}</span></div>'

def home():
    return f'''<section class="home-hero shell"><div class="hero-meta"><span><i class="meta-square"></i> A PERSONAL INDEX</span><span>ENGINEERING / IDEAS / EVERYTHING BETWEEN</span></div><div class="hero-main"><div class="hero-copy"><span class="hero-small-label">HELLO, I'M NISHCHAY <span class="small-star">✳</span></span><h1>Some questions<br>don't fit inside<br><em>a single field.</em></h1><div class="hero-bottom-copy"><p>Computer science undergraduate. Builder of things. Curious about the systems we create—and the world they try to explain.</p><a href="/about/" class="round-arrow" aria-label="More about Nishchay">{icon('up',27)}</a></div></div><div class="hero-art" aria-hidden="true"><div class="hero-art-marker hero-art-marker-top">FIG. 001 <span> / A WORK IN PROGRESS</span></div><div class="hero-art-frame"><div class="hero-art-circle hero-art-circle-1"></div><div class="hero-art-circle hero-art-circle-2"></div><div class="hero-art-circle hero-art-circle-3"></div><div class="hero-art-crosshair horizontal"></div><div class="hero-art-crosshair vertical"></div><div class="hero-art-center"><span class="hero-art-dot"></span><span>ONGOING<br>EXPLORATION</span></div><span class="hero-tick tick-a">N 01°</span><span class="hero-tick tick-b">∞</span><span class="hero-tick tick-c">C / 07</span></div><div class="hero-art-marker hero-art-marker-bottom"><span>CURIOSITY AS METHOD</span><span>↗</span></div></div></div><div class="hero-foot"><span>BASED AT CENTRAL UNIVERSITY OF RAJASTHAN, INDIA</span><a href="#premise" class="hero-scroll">SCROLL TO EXPLORE {icon('down',15)}</a><span>00 : 07</span></div></section>
<section class="premise-section" id="premise"><div class="shell premise-grid"><div class="side-label"><span class="accent-cross">✳</span> 01 / THE PREMISE</div><div class="premise-content"><p class="premise-quote">I like to understand <span>why things work</span> before asking what else they might become.</p><div class="premise-sub"><p>My starting point is computer science, especially AI and software engineering. But the questions I find most interesting often lead into healthcare, materials, biology, robotics, and philosophy.</p>{a('/about/','More about me')}</div></div></div></section>
<section class="section-space shell work-section">{sectionhead('02','SELECTED WORK','Ideas, in <em>progress.</em>','Some are products, some are investigations. All are works in progress, documented as honestly as possible.','/projects/','All projects')}<div class="project-list">{''.join(projectrow(p,i) for i,p in enumerate(projects[:3],1))}</div><div class="work-tail"><span>NO FINISHED STORY REQUIRED.</span>{a('/projects/software-engineering/','Other engineering work')}</div></section>
<section class="orbit-section"><div class="shell orbit-grid"><div class="orbit-left"><span class="section-kicker"><span class="kicker-number">03</span> CURRENT CURIOSITIES</span><h2>On my<br><em>radar.</em></h2><p>These are directions I keep returning to—not claims of expertise or finished work.</p>{a('/explore/','Explore the questions')}</div><div class="radar-list">{''.join(f'<a href="{url}"><span class="radar-number">0{i}</span><span>{t}</span>{icon("up",19)}</a>' for i,(url,t) in enumerate([('/projects/ami/','AI that supports better healthcare interactions'),('/projects/team-plasmonic/','When materials become sensors'),('/explore/','Intelligence beyond software alone'),('/explore/','Memory, consciousness, and existence')],1))}<div class="radar-note">THE LIST WILL KEEP CHANGING. <span>↗</span></div></div></div></section>
<section class="section-space shell writing-section">{sectionhead('04','NOTES FROM THE MARGINS','A space to <em>think.</em>','Technical notes, half-formed questions, and thoughts worth coming back to. The first entries are clearly marked editorial starters.','/writing/','Open the notebook')}<div class="notebook-list">{''.join(note_row(p) for p in notes[:2])}</div></section>
<section class="community-section"><div class="shell community-grid"><div><p class="eyebrow">05 / PEOPLE & COMMUNITIES</p><h2>Building isn't<br>always <em>solitary.</em></h2></div><div class="community-right"><p>Beyond individual projects, I care about creating places for other people to learn, meet, and make things happen.</p><div class="community-links"><a href="/initiatives/"><span>ENAC <small>/ ENGINEERING COMMUNITY</small></span>{icon('up',20)}</a><a href="/initiatives/"><span>B² Chess Club <small>/ CHESS COMMUNITY</small></span>{icon('up',20)}</a></div>{a('/initiatives/','The initiatives')}</div></div></section>
<section class="section-space shell end-section"><div class="end-lead"><span class="eyebrow">06 / THE OPEN DOOR</span><h2>There's always<br><em>another question.</em></h2><p>If you're working on something interesting—or simply have a good question—I'd be glad to hear about it.</p><a href="/contact/" class="button-line">START A CONVERSATION {icon('up',20)}</a></div><div class="end-aside"><p class="eyebrow">FIND ME ELSEWHERE</p>{contact(True)}</div></section>'''

def about():
    return pageintro('02','PERSON / PERSPECTIVE','A little more<br><em>about me.</em>','A work in progress, in more ways than one.')+'''
<section class="shell about-opening"><div class="about-index"><span class="eyebrow">BACKGROUND / 01</span><span class="about-index-mark">N<span>✳</span></span></div><div class="about-introduction"><p>I'm Nishchay, a Computer Science undergraduate at the <strong>Central University of Rajasthan</strong>, India.</p><p>Engineering is where much of my attention goes: AI, machine learning, software, and the fundamentals behind the systems we use. But I don't think interesting questions come neatly separated by discipline.</p><p>Sometimes a problem takes me into healthcare. Sometimes into materials, sensing, biology, or robotics. Other times, the questions aren't about building at all—they're about consciousness, memory, existence, or what it means to understand something.</p></div></section>
<section class="shell about-chapters">'''+''.join(f'<div class="about-chapter"><div class="chapter-label"><span>0{i}</span><span>{label}</span></div><div><h2>{title}</h2><p>{txt}</p><p>{other}</p></div></div>' for i,(label,title,txt,other) in enumerate([
('HOW I LEARN','From principles<br>to <em>practice.</em>','I’m interested in understanding how things work, not only in knowing which tools to use. That means studying foundations, making small experiments, testing assumptions, and being willing to discover that a first approach was wrong.','I value useful engineering as much as theoretical understanding. Ideally, they should keep challenging each other.'),
('WHY IT SPREADS','The boundaries<br>are <em>interesting.</em>','Some of the problems I’m drawn to don’t fit inside a single domain. AI in healthcare depends on understanding people and clinical realities. A sensing device brings together materials, electronics, and design. Robotics asks software to deal with the physical world.','I’m not an expert in all of these areas. I’m exploring them because their intersections seem worth understanding.'),
('THE LONGER VIEW','Ambitious questions.<br><em>Patient work.</em>','In the long run, I’d like to contribute to technologies that expand what people can do and what we understand about the world. Right now, that ambition takes a much simpler form: learn deeply, build carefully, collaborate well, and keep asking better questions.','There is still a great deal I don’t know. That’s part of what makes the work compelling.')],1))+'''</section>
<section class="shell about-last"><div><span class="eyebrow">OUTSIDE THE TECHNICAL FRAME</span><h2>Not everything worth<br>thinking about needs<br><em>an application.</em></h2></div><div><p>Human life, consciousness, the nature of God, memory, and existence are subjects I want to keep exploring without pretending to have settled answers.</p><p class="small-muted">This biography is a starting draft based on information shared for this site. Add the moments, books, experiences, and personal details that make it unmistakably yours.</p>'''+a('/writing/','Some questions, in writing')+'</div></section>'

def projects_page():
    out=pageintro('03','WORK / EXPERIMENTS','Things I’m<br><em>working through.</em>','From emerging ideas to working prototypes. These case studies separate what exists from what is still being explored.')+'<section class="shell project-gallery">'
    for i,p in enumerate(projects,1):
        out+=f'<a class="gallery-item" href="/projects/{p["slug"]}/">{visual(p["slug"])}<div class="gallery-info"><div><p class="eyebrow">0{i} / {escape(p["eyebrow"])}</p><h2>{escape(p["title"])}</h2><p>{escape(p["summary"])}</p><span class="gallery-status">{escape(p["status"])}</span></div><span class="gallery-arrow">{icon("up",25)}</span></div></a>'
    return out+'</section><section class="shell gallery-closing"><span>THIS INDEX IS INTENTIONALLY INCOMPLETE.</span><p>Each project changes as the thinking, building, and evidence change. The notes will too.</p></section>'

def project_detail(p,kind):
    docs=projects if kind=='projects' else notes
    idx=docs.index(p); nxt=docs[(idx+1)%len(docs)]
    body=mistune.create_markdown(plugins=['strikethrough','table','url'])(p['body'])
    tags=''.join(f'<span class="article-tag">{escape(t)}</span>' for t in p.get('tags',[]))
    side=f'<aside class="article-side"><div class="article-side-sticky"><p class="eyebrow">{"FIELD NOTES / PROJECT" if kind=="projects" else "IN THE MARGINS"}</p><p>{"Background, working approach, open challenges, and what still needs to be documented." if kind=="projects" else "Ideas to revisit, test, and develop."}</p><span class="article-side-rule"></span>{tags}</div></aside>'
    if kind=='projects':
        detail=f'<div class="detail-heading"><div><p class="eyebrow">{escape(p["eyebrow"])}</p><h1>{escape(p["title"])}</h1><p class="detail-lead">{escape(p["summary"])}</p></div><div class="detail-meta"><span>STATUS</span><p>{escape(p["status"])}</p><span>AREAS</span><p>{escape(" / ".join(p["tags"]))}</p></div></div>{visual(p["slug"],True)}'
    else:
        detail=f'<div class="writing-title-block"><p class="eyebrow">{escape(p["eyebrow"])}</p><h1>{escape(p["title"])}</h1><p class="detail-lead">{escape(p["summary"])}</p><span class="writing-status">{escape(p["status"])}</span></div>'
    return f'<article class="detail-page {"detail-writing" if kind=="writing" else ""} shell"><div class="detail-top"><a href="/{kind}/" class="back-link">{icon("left",17)} ALL {"PROJECTS" if kind=="projects" else "NOTES"}</a><span>{"CASE STUDY" if kind=="projects" else "NOTEBOOK"} / 0{idx+1}</span></div>{detail}<div class="article-grid">{side}<div class="article-prose">{body}</div></div></article><div class="next-item shell"><div><span class="eyebrow">CONTINUE EXPLORING</span><a href="/{kind}/{nxt["slug"]}/">{escape(nxt["title"])} {icon("right",27)}</a></div>{a(f"/{kind}/","All projects" if kind=="projects" else "All notes")}</div>'

def explore():
    areas=[
       ('Artificial intelligence','Systems & intelligence','Learning how models learn, reason, fail, and become useful in real settings—not just in a benchmark.',['What should be learned, and what should be designed?','What makes an AI system reliable?']),
       ('Healthcare & biomedicine','Human-centered technology','Interested in tools that improve access, context, and continuity without removing human judgment.',['What gets lost between first symptoms and proper care?','Where can software actually help?']),
       ('Materials & nanotechnology','The physical frontier','Curious about the behavior of materials, sensing mechanisms, and the engineering possibilities at small scales.',['How does a material become a sensor?','Which properties matter outside the lab?']),
       ('Robotics & embodied systems','Intelligence in motion','Exploring the intersection of perception, control, electronics, and the physical world.',['What changes when intelligence has a body?','How do real environments challenge models?']),
       ('Biology & living systems','Complexity & life','Looking at biological systems as scientific mysteries in their own right, not merely metaphors for computing.',['How does complexity produce robust behavior?','What can engineering learn from life?']),
       ('Consciousness & philosophy','Questions beyond engineering','Thoughts about memory, experience, existence, the nature of God, and what science may or may not explain.',['What is it like to know?','Which questions can technology never settle alone?'])]
    return pageintro('04','CURIOSITY / OUTSIDE THE LINES','An unfinished<br><em>map of interests.</em>','Not a list of expertise. A collection of territories I want to understand better, and the questions pulling me toward them.')+'<section class="shell explore-intro"><span class="eyebrow">A NOTE ON CURIOSITY</span><p>Computer science is a starting point. The world doesn’t organize itself by university department, and neither do the most interesting problems.</p></section><section class="shell explore-grid">'+''.join(f'<article class="explore-item"><div class="explore-item-top"><span>0{i} / 06</span><span class="explore-symbol">↗</span></div><p class="eyebrow">{kind}</p><h2>{name}</h2><p class="explore-description">{desc}</p><div class="explore-questions"><span class="eyebrow">QUESTIONS THAT INTEREST ME</span>{"".join(f"<p>{q}</p>" for q in qs)}</div></article>' for i,(name,kind,desc,qs) in enumerate(areas,1))+'</section><section class="shell explore-outro"><span class="large-asterisk" aria-hidden="true">✳</span><div><h2>Curiosity is not<br><em>a credential.</em></h2><p>Being interested in a field means there’s work to do: reading, asking, experimenting, and learning from people who know more.</p>'+a('/writing/','Follow the thinking')+'</div></section>'

def writing():
    return pageintro('05','NOTES / OPEN QUESTIONS','The thinking<br><em>doesn’t stop.</em>','Notes, technical explanations, and questions I want to examine more closely. Not every thought here needs a conclusion.')+f'<section class="shell notebook-page"><div class="notebook-page-heading"><span class="eyebrow">THE NOTEBOOK / 0{len(notes)} ENTRIES</span><p>Initial entries are marked editorial starters to be rewritten in my own words before publication.</p></div><div class="notebook-list">{"".join(note_row(p) for p in notes)}</div></section><section class="shell note-add"><span>+</span><p>More writing will find its way here.</p><small>New entries are added as MDX files in /content/writing.</small></section>'

def initiatives():
    data=[('ENAC','Engineering community · CURAJ','An initiative to connect students around engineering, technology, and collaborative exploration. The focus is on making it easier to learn, make, and exchange ideas together.','Community building & organization','Add events, photographs, team roles, and verified milestones.'),('B² Chess Club','Chess community · CURAJ','A student community built around chess and the simple idea that a shared interest can bring people together. Organizing a space for play, learning, and competition is part of the work.','Community building & events','Add tournament archives, photographs, and event links.')]
    return pageintro('06','PEOPLE / INITIATIVES','Things we build<br><em>together.</em>','Sometimes the most useful thing to build isn’t software. It’s a community where people can connect, learn, and start something new.')+'<section class="shell initiatives-list">'+''.join(f'<article class="initiative-block"><div class="initiative-index"><span>0{i} / COMMUNITY</span><span class="initiative-decoration" aria-hidden="true">{"✳" if i==1 else "♞"}</span></div><div class="initiative-content"><span class="eyebrow">{sub}</span><h2>{nm}</h2><p>{desc}</p><div class="initiative-involvement"><span class="eyebrow">INVOLVEMENT</span><span>{role}</span></div><div class="initiative-to-add"><span>TO DOCUMENT</span>{toadd}</div></div></article>' for i,(nm,sub,desc,role,toadd) in enumerate(data,1))+'</section><section class="shell initiative-outro"><span class="eyebrow">THE BIGGER PICTURE</span><p>A strong engineering culture grows from people sharing knowledge, initiative, failures, and a willingness to try.</p>'+a('/contact/','Start a conversation')+'</section>'

def contactpage():
    return pageintro('07','CONTACT / CONNECT','Good questions<br>start <em>conversations.</em>','If you’re exploring something interesting, working on a thoughtful problem, or want to exchange ideas, I’d be glad to connect.')+'<section class="shell contact-page-grid"><div class="contact-intro"><p class="eyebrow">REACH OUT</p><h2>Open to<br><em>ideas.</em></h2><p>I especially enjoy conversations across disciplines—where technical questions meet real-world needs or bigger questions about the world.</p><p class="small-muted">No contact address or profile URL was supplied for this version. Add them in <code>lib/site.ts</code> to activate the links automatically.</p></div>'+contact()+'</section><div class="shell contact-postscript"><span>PS.</span><p>I’m still learning. Interesting questions are always welcome.</p></div>'

js='''document.addEventListener('DOMContentLoaded',()=>{const b=document.querySelector('.menu-toggle'),n=document.getElementById('mobile-menu');if(!b||!n)return;const set=o=>{b.setAttribute('aria-expanded',String(o));b.setAttribute('aria-label',o?'Close navigation menu':'Open navigation menu');b.innerHTML=o?'<svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>':'<svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';n.classList.toggle('mobile-nav-open',o);n.inert=!o};b.addEventListener('click',()=>set(b.getAttribute('aria-expanded')!=='true'));n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>set(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)})});'''
(DEST/'script.js').write_text(js)

def write(rel,title,body):
    p=DEST/rel/'index.html' if rel else DEST/'index.html'
    p.parent.mkdir(parents=True,exist_ok=True)
    asset_prefix='../' * len(Path(rel).parts) if rel else ''
    doc=f'''<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#111310"><title>{escape(title)} | Nishchay</title><meta name="description" content="A personal space for engineering, interdisciplinary exploration, and unanswered questions."><link rel="icon" href="{asset_prefix}icon.svg" type="image/svg+xml"><link rel="stylesheet" href="{asset_prefix}styles.css"><script defer src="{asset_prefix}script.js"></script></head><body id="top"><a class="skip-link" href="#main">Skip to content</a>{nav('/'+rel+'/' if rel else '/') }<main id="main">{body}</main>{footer()}</body></html>'''
    # Rewrite links so the preview navigates both when hosted and opened as local files.
    def local_link(match):
        target=match.group(1).rstrip('/')
        return 'href="'+asset_prefix+(target+'/index.html' if target else 'index.html')+'"'
    doc=re.sub(r'href="/([^"#]*)"',local_link,doc)
    p.write_text(doc)

write('','Home',home())
write('about','About',about());write('projects','Projects',projects_page())
write('explore','Explore',explore());write('writing','Writing',writing())
write('initiatives','Initiatives',initiatives());write('contact','Contact',contactpage())
for p in projects: write('projects/'+p['slug'],p['title'],project_detail(p,'projects'))
for p in notes: write('writing/'+p['slug'],p['title'],project_detail(p,'writing'))
print(f'Wrote {7+len(projects)+len(notes)} pages to {DEST}')
