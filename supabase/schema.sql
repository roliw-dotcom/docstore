-- DocStore Database Schema
-- Run this in the Supabase SQL editor

-- Documents table
create table if not exists public.documents (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  filename    text not null,
  storage_path text not null,         -- path in Supabase Storage bucket
  file_size   bigint,
  mime_type   text default 'application/pdf',
  status      text not null default 'pending'
                check (status in ('pending', 'processing', 'ready', 'error')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Document metadata (filled after LLM processing)
create table if not exists public.doc_metadata (
  id          uuid primary key default gen_random_uuid(),
  doc_id      uuid not null references public.documents(id) on delete cascade,
  summary     text,
  keywords    text[] default '{}',
  categories  text[] default '{}',
  page_count  integer,
  created_at  timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger documents_updated_at
  before update on public.documents
  for each row execute function public.set_updated_at();

-- Row Level Security: users can only see/modify their own documents
alter table public.documents enable row level security;
alter table public.doc_metadata enable row level security;

create policy "Users can manage their own documents"
  on public.documents for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can view metadata for their documents"
  on public.doc_metadata for all
  using (
    exists (
      select 1 from public.documents d
      where d.id = doc_id and d.user_id = auth.uid()
    )
  );

-- Full-text search index on keywords
create index if not exists documents_user_id_idx on public.documents(user_id);
create index if not exists doc_metadata_doc_id_idx on public.doc_metadata(doc_id);
create index if not exists doc_metadata_keywords_idx on public.doc_metadata using gin(keywords);
