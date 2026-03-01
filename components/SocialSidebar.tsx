'use client'

import { Facebook, Instagram } from "lucide-react";

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/morateur2026/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61571627498498", label: "Facebook" },
];

const SocialSidebar = () => {
  return (
    <nav
      aria-label="Réseaux sociaux"
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:block"
    >
      <div className="bg-foreground/80 backdrop-blur-md rounded-r-xl shadow-lg flex flex-col items-stretch overflow-hidden">
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-11 h-11 flex items-center justify-center text-background/80 hover:text-campaign-lime hover:bg-campaign-lime/15 transition-all duration-200"
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
