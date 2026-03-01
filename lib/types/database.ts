export interface Message {
  id: string
  prenom: string
  nom: string
  email: string
  tel: string
  motivations: string
  is_read: boolean
  created_at: string
}

export interface Article {
  id: string
  title: string
  date: string
  image: string
  tag: string
  description: string
  sort_order: number
  created_at: string
}

export interface ProgrammePillar {
  id: string
  title: string
  intro: string
  icon: string
  color: string
  icon_bg: string
  sort_order: number
  measures?: ProgrammeMeasure[]
}

export interface ProgrammeMeasure {
  id: string
  pillar_id: string
  title: string
  detail: string
  sort_order: number
}

export interface Event {
  id: string
  icon: string
  date: string
  title: string
  description: string
  is_done: boolean
  sort_order: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  description: string
  sort_order: number
}

export interface PressArticle {
  id: string
  source: string
  author: string
  date: string
  title: string
  excerpt: string
  url: string
  logo: string
  sort_order: number
}

export interface SeoPage {
  id: string
  path: string
  title: string
  description: string
  keywords: string
  og_image: string
}
