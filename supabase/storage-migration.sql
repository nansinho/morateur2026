-- ============================================
-- Migration : Bucket de stockage 'images'
-- ============================================

-- Creation du bucket 'images' (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: upload pour les utilisateurs authentifies
CREATE POLICY "Auth users can upload images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'images');

-- Policy: lecture publique
CREATE POLICY "Public read access on images"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'images');

-- Policy: suppression pour les utilisateurs authentifies
CREATE POLICY "Auth users can delete images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'images');

-- Policy: mise a jour pour les utilisateurs authentifies
CREATE POLICY "Auth users can update images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'images');
