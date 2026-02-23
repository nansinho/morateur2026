import { Facebook, Instagram, Linkedin } from "lucide-react";


const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
  </svg>
);

const socials = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: XIcon, href: "https://x.com", label: "X" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: TikTokIcon, href: "https://tiktok.com", label: "TikTok" },
];

const SocialSidebar = () => {
  return (
    <nav
      aria-label="Réseaux sociaux"
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col"
    >
      <div className="bg-background border border-l-0 border-border rounded-r-2xl shadow-xl py-4 px-2.5 flex flex-col gap-1.5">
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground/70 hover:text-campaign-lime hover:bg-campaign-lime/10 transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default SocialSidebar;
