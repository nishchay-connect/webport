import type { MetadataRoute } from "next";
import { getEntries } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = ["", "/about", "/projects", "/explore", "/writing", "/initiatives", "/contact"];
  const projects = getEntries("projects").map((p) => `/projects/${p.slug}`);
  const notes = getEntries("writing").map((p) => `/writing/${p.slug}`);
  return [...routes, ...projects, ...notes].map((route) => ({ url: `${base}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.7 }));
}
