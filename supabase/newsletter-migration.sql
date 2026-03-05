-- Migration: Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  consent_date TIMESTAMPTZ
);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for newsletter signup from the website)
CREATE POLICY "Allow public insert" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read (for admin dashboard)
CREATE POLICY "Allow authenticated read" ON newsletter_subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update (for unsubscribe management)
CREATE POLICY "Allow authenticated update" ON newsletter_subscribers
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON newsletter_subscribers
  FOR DELETE USING (auth.role() = 'authenticated');
