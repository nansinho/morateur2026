import {
  ShieldCheck, Building2, Store, Leaf, GraduationCap,
  Flag, Users, Vote, CalendarCheck, Megaphone, PartyPopper,
  Heart, Star, Lightbulb, Target, Zap, Globe, BookOpen,
  Wifi,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Building2,
  Store,
  Leaf,
  GraduationCap,
  Flag,
  Users,
  Vote,
  CalendarCheck,
  Megaphone,
  PartyPopper,
  Heart,
  Star,
  Lightbulb,
  Target,
  Zap,
  Globe,
  BookOpen,
  Wifi,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || ShieldCheck
}
