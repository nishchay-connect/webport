import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { navigation, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <p className="eyebrow"><span className="accent-cross">✳</span> AN OPEN-ENDED INDEX</p>
            <h2>Still curious<span className="footer-period">.</span></h2>
            <p className="footer-phrase">For conversations, collaborations, and questions worth exploring.</p>
            <Link href="/contact" className="text-link text-link-large">Get in touch <ArrowUpRight size={22} strokeWidth={1.4} /></Link>
          </div>
          <div className="footer-right">
            <span className="eyebrow">DIRECTORY</span>
            <div className="footer-nav">
              {navigation.slice(1).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Made as a place to keep learning.</span>
          <a href="#top" className="back-top">BACK TO TOP <MoveUpRight size={14} /></a>
        </div>
        <p className="footer-signature" aria-hidden="true">NISHCHAY<span>↗</span></p>
      </div>
    </footer>
  );
}
