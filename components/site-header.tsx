"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-shell shell">
        <Link href="/" className="brand" aria-label="Nishchay — homepage" onClick={() => setOpen(false)}>
          <span className="brand-mark">N<span className="brand-period">.</span></span>
          <span className="brand-caption">NISHCHAY<span className="brand-caption-muted"> / INDEX</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)) ? "is-active" : ""}`}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-end">
          <span className="availability"><span className="availability-dot" /> CURRENTLY EXPLORING</span>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <nav id="mobile-menu" className={`mobile-nav ${open ? "mobile-nav-open" : ""}`} aria-label="Mobile navigation" inert={!open}>
        <div className="mobile-nav-inner shell">
          <p className="eyebrow">TABLE OF CONTENTS / 07</p>
          {navigation.map((item, index) => (
            <Link href={item.href} key={item.href} className="mobile-nav-link" onClick={() => setOpen(false)}>
              <span className="mono">0{index + 1}</span>
              <span>{item.label}</span>
              <ArrowUpRight size={21} strokeWidth={1.35} />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
