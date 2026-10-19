-- Paste into Supabase > SQL Editor and run once.
create extension if not exists pgcrypto;
create table if not exists public.site_settings (
 id integer primary key default 1 check(id=1), data jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now()
);
insert into public.site_settings(id,data) values (1,'{}'::jsonb) on conflict (id) do nothing;
create table if not exists public.projects (
 id uuid primary key default gen_random_uuid(), title text not null, category text not null default '', description text not null default '', image_url text not null default '', demo_url text not null default '', sort_order integer not null default 0, created_at timestamptz not null default now()
);
create index if not exists projects_sort_idx on public.projects(sort_order,created_at desc);
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
-- No public SQL access: Next.js server uses the service-role key.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('portfolio','portfolio',true,8388608,array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do nothing;
-- Images are publicly readable through the bucket URL; uploads require server-side service role.
