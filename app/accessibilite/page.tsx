import type { Metadata } from "next";
import AccessibiliteContent from "./accessibilite-content";

export const metadata: Metadata = {
  title: "Accessibilité",
  description:
    "Notre engagement pour l'accessibilité numérique et l'inclusion de toutes les personnes en situation de handicap à Bouc-Bel-Air.",
  alternates: { canonical: "/accessibilite" },
};

export default function AccessibilitePage() {
  return <AccessibiliteContent />;
}
