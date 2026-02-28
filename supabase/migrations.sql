-- Run this in the Supabase SQL editor

-- Add unique constraint so we can upsert metadata on re-processing
alter table public.doc_metadata
  add constraint doc_metadata_doc_id_unique unique (doc_id);
