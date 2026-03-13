-- ── Workspaces migration ────────────────────────────────────────────────────
-- Run this in the Supabase SQL editor.
-- Every existing user gets a personal workspace automatically.
-- New users get one via trigger. Solo users never see the workspace layer.

-- ── 1. Tables ────────────────────────────────────────────────────────────────

create table if not exists workspaces (
  id         uuid primary key default gen_random_uuid(),
  name       text not null default 'Personal',
  owner_id   uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists workspace_members (
  workspace_id uuid references workspaces(id) on delete cascade not null,
  user_id      uuid references auth.users(id) on delete cascade not null,
  role         text not null default 'owner',  -- 'owner' | 'member' | 'viewer'
  created_at   timestamptz default now(),
  primary key (workspace_id, user_id)
);

-- ── 2. RLS on new tables ─────────────────────────────────────────────────────

alter table workspaces       enable row level security;
alter table workspace_members enable row level security;

create policy "Members can view their workspaces"
  on workspaces for select
  using (id in (
    select workspace_id from workspace_members where user_id = auth.uid()
  ));

create policy "Members can update their workspaces"
  on workspaces for update
  using (id in (
    select workspace_id from workspace_members
    where user_id = auth.uid() and role = 'owner'
  ));

create policy "Members can view workspace membership"
  on workspace_members for select
  using (workspace_id in (
    select workspace_id from workspace_members where user_id = auth.uid()
  ));

create policy "Owners can manage membership"
  on workspace_members for all
  using (workspace_id in (
    select workspace_id from workspace_members
    where user_id = auth.uid() and role = 'owner'
  ));

-- ── 3. Helper: is the current user a member of a given workspace? ─────────────

create or replace function is_workspace_member(wid uuid)
returns boolean
language sql security definer stable
as $$
  select exists (
    select 1 from workspace_members
    where workspace_id = wid and user_id = auth.uid()
  );
$$;

-- ── 4. Add workspace_id to existing tables ───────────────────────────────────

alter table documents  add column if not exists workspace_id uuid references workspaces(id) on delete cascade;
alter table collections add column if not exists workspace_id uuid references workspaces(id) on delete cascade;
alter table follow_ups  add column if not exists workspace_id uuid references workspaces(id) on delete cascade;

-- ── 5. Trigger: auto-create personal workspace for every new user ─────────────

create or replace function create_personal_workspace()
returns trigger language plpgsql security definer
as $$
declare
  new_workspace_id uuid;
begin
  insert into workspaces (name, owner_id)
    values ('Personal', new.id)
    returning id into new_workspace_id;

  insert into workspace_members (workspace_id, user_id, role)
    values (new_workspace_id, new.id, 'owner');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_workspace on auth.users;
create trigger on_auth_user_created_workspace
  after insert on auth.users
  for each row execute procedure create_personal_workspace();

-- ── 6. Data migration: create workspaces for existing users ──────────────────

do $$
declare
  u    record;
  wid  uuid;
begin
  for u in select id from auth.users loop
    -- Skip if already has a workspace
    select workspace_id into wid
      from workspace_members
      where user_id = u.id and role = 'owner'
      limit 1;

    if wid is null then
      insert into workspaces (name, owner_id)
        values ('Personal', u.id)
        returning id into wid;

      insert into workspace_members (workspace_id, user_id, role)
        values (wid, u.id, 'owner');
    end if;

    -- Backfill workspace_id on existing rows
    update documents   set workspace_id = wid where user_id = u.id and workspace_id is null;
    update collections set workspace_id = wid where user_id = u.id and workspace_id is null;
    update follow_ups  set workspace_id = wid where user_id = u.id and workspace_id is null;
  end loop;
end;
$$;

-- ── 7. Update RLS on documents to use workspace membership ───────────────────
-- Drop existing policies and replace with workspace-aware ones.

drop policy if exists "Users can view their own documents"      on documents;
drop policy if exists "Users can insert their own documents"    on documents;
drop policy if exists "Users can update their own documents"    on documents;
drop policy if exists "Users can delete their own documents"    on documents;
-- Catch-all for any unnamed policies
do $$
declare pol record;
begin
  for pol in select policyname from pg_policies where tablename = 'documents' loop
    execute format('drop policy if exists %I on documents', pol.policyname);
  end loop;
end $$;

create policy "Workspace members can view documents"
  on documents for select
  using (is_workspace_member(workspace_id));

create policy "Workspace members can insert documents"
  on documents for insert
  with check (is_workspace_member(workspace_id));

create policy "Workspace members can update documents"
  on documents for update
  using (is_workspace_member(workspace_id));

create policy "Workspace members can delete documents"
  on documents for delete
  using (is_workspace_member(workspace_id));

-- ── 8. Update RLS on collections ─────────────────────────────────────────────

do $$
declare pol record;
begin
  for pol in select policyname from pg_policies where tablename = 'collections' loop
    execute format('drop policy if exists %I on collections', pol.policyname);
  end loop;
end $$;

create policy "Workspace members can manage collections"
  on collections for all
  using  (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

-- ── 9. Update RLS on follow_ups ──────────────────────────────────────────────

do $$
declare pol record;
begin
  for pol in select policyname from pg_policies where tablename = 'follow_ups' loop
    execute format('drop policy if exists %I on follow_ups', pol.policyname);
  end loop;
end $$;

create policy "Workspace members can manage follow_ups"
  on follow_ups for all
  using  (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

-- ── 10. Update RLS on doc_metadata ───────────────────────────────────────────
-- doc_metadata is accessed via documents join; ensure cascade works.
-- Existing policies should be fine since doc_metadata has no user_id —
-- access is implicitly controlled via the documents FK + the documents RLS.
-- No changes needed here.
