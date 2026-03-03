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
  slug?: string
  date: string
  image: string
  image_alt?: string
  tag: string
  description: string
  content?: string
  meta_description?: string
  meta_keywords?: string
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

// Consultations citoyennes par quartier

export interface Quartier {
  id: string
  slug: string
  name: string
  description: string
  closing_image_url: string
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface QuartierQuestion {
  id: string
  quartier_id: string
  question_number: number
  question_text: string
  question_image_url: string
  is_active: boolean
  created_at: string
}

export interface ConsultationSubmission {
  id: string
  quartier_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  wants_personal_response: boolean
  wants_callback: boolean
  status: 'new' | 'read' | 'replied' | 'archived'
  admin_notes: string
  replied_at: string | null
  replied_by: string | null
  created_at: string
  updated_at: string
  quartiers?: { name: string }
}

export interface ConsultationAnswer {
  id: string
  submission_id: string
  question_id: string
  answer_text: string
  created_at: string
  quartier_questions?: { question_text: string; question_number: number }
}

export interface AdminReply {
  id: string
  submission_id: string
  reply_text: string
  sent_at: string
  sent_by: string
}

export interface QuartierStats {
  quartier_id: string
  slug: string
  quartier_name: string
  total_submissions: number
  new_count: number
  read_count: number
  replied_count: number
  archived_count: number
  wants_response_count: number
  wants_callback_count: number
  last_submission_at: string | null
}

export interface ChatbotEntry {
  id: string
  question: string
  answer: string
  category: string
  parent_id: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}
