-- Run this in the Supabase SQL editor

create table if not exists collections (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade not null,
  name       text not null,
  color      text not null default '#6A90AA',
  created_at timestamptz default now()
);

alter table collections enable row level security;

create policy "Users manage own collections"
  on collections for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Add collection_id to documents (nullable, set null on collection delete)
alter table documents
  add column if not exists collection_id uuid references collections(id) on delete set null;
