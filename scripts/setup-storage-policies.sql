-- Storage Policies for 'images' bucket
-- Run this in Supabase Dashboard → SQL Editor

-- 1. Allow anyone to READ images (public access)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

-- 2. Allow authenticated users to UPLOAD images
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- 3. Allow authenticated users to UPDATE their uploads
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'images');

-- 4. Allow authenticated users to DELETE images
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'images');
