import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() {
  return <section className="shell state-page"><span className="eyebrow">404 / NOT IN THE INDEX</span><h1>Nothing here.<br /><em>Yet.</em></h1><p>This page doesn't exist or may have moved.</p><Link href="/" className="text-link"><ArrowLeft size={17}/> Return home</Link></section>;
}
