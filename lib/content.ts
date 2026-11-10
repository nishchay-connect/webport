import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ContentKind = "projects" | "writing";
export type ContentEntry = {
  slug: string;
  title: string;
  summary: string;
  eyebrow: string;
  status: string;
  order: number;
  tags: string[];
  featured: boolean;
  body: string;
};

function folder(kind: ContentKind) {
  return path.join(process.cwd(), "content", kind);
}

function readEntry(kind: ContentKind, slug: string): ContentEntry | null {
  // Avoid arbitrary file paths in dynamic routes.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const filename = path.join(folder(kind), `${slug}.mdx`);
  if (!fs.existsSync(filename)) return null;

  const { data, content } = matter(fs.readFileSync(filename, "utf8"));
  return {
    slug,
    title: String(data.title || slug),
    summary: String(data.summary || ""),
    eyebrow: String(data.eyebrow || (kind === "projects" ? "Project" : "Note")),
    status: String(data.status || "To update"),
    order: Number(data.order || 99),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    featured: Boolean(data.featured),
    body: content,
  };
}

export function getEntry(kind: ContentKind, slug: string) {
  return readEntry(kind, slug);
}

export function getEntries(kind: ContentKind): ContentEntry[] {
  return fs
    .readdirSync(folder(kind))
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => readEntry(kind, filename.replace(/\.mdx$/, "")))
    .filter((entry): entry is ContentEntry => entry !== null)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}
