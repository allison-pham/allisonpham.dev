import Link from "next/link";
import { Github, Figma, Linkedin, Mail, ExternalLink, Heart } from "lucide-react";
import { SiSubstack } from "react-icons/si";

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/imallisonpham", handle: "imallisonpham", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/allison-pham", handle: "@allison-pham", icon: Github },
  { label: "Figma", href: "https://www.figma.com/@allisonpham", handle: "@allisonpham", icon: Figma },
  { label: "Substack", href: "https://allisonpham.substack.com", handle: "@allisonpham", icon: SiSubstack },
  { label: "Email", href: "mailto:apham206@ucr.edu", handle: "apham206@ucr.edu", icon: Mail },
];

const quickLinks = [
  { label: "about", href: "/about" },
  { label: "experiences", href: "/experiences" },
  { label: "projects", href: "/projects" },
  { label: "blog", href: "/blog" },
  { label: "lab", href: "/lab" },
  { label: "collections", href: "/collections" },
  { label: "playground", href: "/playground" },
];

export function Footer() {
  return (
    <footer id="connect" className="border-t border-border/30 px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {/* Intro */}
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="font-mono text-xs tracking-[0.25em] text-primary">Allison Pham</p>
              <p className="text-sm leading-relaxed text-muted-foreground">Design engineering at the intersection of cognition and HCI</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span>status: building</span>
              </div>
              <p className="font-mono text-[11px] text-muted-foreground pl-4.5 border-l border-border/50 ml-1">currently → hci for space systems + website</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground">pages</p>
            <div className="grid grid-rows-4 grid-flow-col gap-x-8 gap-y-1.5">
              {quickLinks.map((link) => (
                <Link key={link.label} href={link.href} className="group flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary">
                  <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">{">"}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground">connect</p>
            <div className="space-y-1.5">
              {socialLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between rounded-lg border border-transparent px-3 py-2.5 transition-all duration-300 hover:border-border/50 hover:bg-card/50 glass"
                  style={{ animationDelay: `${index * 100 + 400}ms` }}
                >
                  <div className="flex items-center gap-2.5">
                    <link.icon className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
                    <span className="font-mono text-xs font-medium transition-colors group-hover:text-gradient">{link.label}</span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground/50 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5" />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground truncate max-w-32">{link.handle}</span>
                </a>
              ))}
            </div>

            {/* Email */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1.5">Want to work together?</p>
              <a href="mailto:apham206@ucr.edu" className="group flex items-center gap-2 font-mono text-xs text-primary transition-colors hover:text-foreground">
                <Mail className="h-3.5 w-3.5" />
                Say hi! →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-center border-t border-border/30 pt-6">
          <div className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            © {new Date().getFullYear()} Allison Pham
            <span className="text-border">|</span>
            <Heart className="h-3 w-3 text-destructive animate-pulse" />
            <span>& curiositea</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
