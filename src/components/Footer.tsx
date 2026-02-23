import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-12">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-heading text-xl font-bold">
            Morateur <span className="text-campaign-green">2026</span>
          </p>
          <p className="text-primary-foreground/50 text-sm mt-1">
            Bouc Bel Air a de l'Avenir
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/profile.php?id=61571627498498"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-campaign-green/20 transition"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/morateur2026/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-campaign-green/20 transition"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-campaign-green/20 transition"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center">
        <p className="text-primary-foreground/40 text-xs">
          © 2026 Morateur 2026 — Tous droits réservés. Site de campagne.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
