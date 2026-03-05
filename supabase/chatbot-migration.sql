-- ============================================
-- Migration : Chatbot Q&A
-- ============================================

-- Entrées du chatbot (questions/réponses prédéfinies)
CREATE TABLE IF NOT EXISTS chatbot_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  parent_id UUID REFERENCES chatbot_entries(id) ON DELETE SET NULL,
  link_url TEXT DEFAULT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_chatbot_entries_parent ON chatbot_entries(parent_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_entries_active ON chatbot_entries(is_active);
CREATE INDEX IF NOT EXISTS idx_chatbot_entries_sort ON chatbot_entries(sort_order);

-- RLS
ALTER TABLE chatbot_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique chatbot" ON chatbot_entries FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin : insertion chatbot" ON chatbot_entries FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin : modification chatbot" ON chatbot_entries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin : suppression chatbot" ON chatbot_entries FOR DELETE TO authenticated USING (true);
