import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/site";

const profiles = [
  { key: "github" as const, name: "GitHub", label: "Code, experiments, repositories", Icon: Github },
  { key: "linkedin" as const, name: "LinkedIn", label: "Professional updates and conversations", Icon: Linkedin },
  { key: "email" as const, name: "Email", label: "For a direct conversation", Icon: Mail },
];

export function ContactOptions({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`contact-options ${compact ? "contact-options-compact" : ""}`}>
      {profiles.map(({ key, name, label, Icon }) => {
        const value = site.links[key];
        const link = key === "email" && value ? `mailto:${value}` : value;
        const content = <>
          <span className="contact-option-icon"><Icon size={20} strokeWidth={1.4} /></span>
          <span className="contact-option-copy"><strong>{name}</strong><small>{value && key === "email" ? value : label}</small></span>
          {link ? <ArrowUpRight size={20} strokeWidth={1.4} /> : <span className="contact-pending">LINK TO ADD</span>}
        </>;
        return link ?
          <a href={link} key={key} className="contact-option" target={key === "email" ? undefined : "_blank"} rel={key === "email" ? undefined : "noopener noreferrer"}>{content}</a> :
          <div key={key} className="contact-option contact-option-empty" title={`Add your ${name} details in lib/site.ts`}>{content}</div>;
      })}
    </div>
  );
}
