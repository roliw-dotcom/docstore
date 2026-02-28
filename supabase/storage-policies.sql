-- Storage RLS policies for the 'documents' bucket
-- Run this in the Supabase SQL editor AFTER creating the bucket

drop policy if exists "Users can upload their own files" on storage.objects;
drop policy if exists "Users can read their own files" on storage.objects;
drop policy if exists "Users can delete their own files" on storage.objects;

-- Allow users to upload files into their own user_id folder
create policy "Users can upload their own files"
  on storage.objects for insert
  with check (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to read their own files
create policy "Users can read their own files"
  on storage.objects for select
  using (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to delete their own files
create policy "Users can delete their own files"
  on storage.objects for delete
  using (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
