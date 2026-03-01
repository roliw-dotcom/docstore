create table public.follow_ups (
  id          uuid primary key default gen_random_uuid(),
  doc_id      uuid not null references public.documents(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null,
  description text,
  due_date    date,
  completed   boolean not null default false,
  reminded    boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.follow_ups enable row level security;

create policy "Users manage their own follow-ups"
  on public.follow_ups for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index on public.follow_ups(user_id);
create index on public.follow_ups(doc_id);
create index on public.follow_ups(due_date) where completed = false;
