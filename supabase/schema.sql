-- Run this in Supabase SQL Editor before deploying the application.
-- The public key may insert a contact request but can never read it.

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 120),
  contact text not null check (char_length(trim(contact)) between 3 and 255),
  query text check (query is null or char_length(query) <= 5000),
  status text not null default 'new' check (status in ('new', 'processed')),
  created_at timestamptz not null default now()
);

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);

grant usage on schema public to anon, authenticated;
grant insert on public.applications to anon, authenticated;
grant select, update, delete on public.applications to authenticated;

alter table public.applications enable row level security;

drop policy if exists "Anyone can submit an application" on public.applications;
create policy "Anyone can submit an application"
on public.applications for insert to anon, authenticated
with check (
  char_length(trim(name)) between 1 and 120
  and char_length(trim(contact)) between 3 and 255
  and (query is null or char_length(query) <= 5000)
  and status = 'new'
);

drop policy if exists "Admins can read applications" on public.applications;
create policy "Admins can read applications"
on public.applications for select to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update applications" on public.applications;
create policy "Admins can update applications"
on public.applications for update to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can delete applications" on public.applications;
create policy "Admins can delete applications"
on public.applications for delete to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Create the administrator in Authentication > Users, then set server-managed
-- app_metadata (never user_metadata) through the Admin API or SQL Editor:
-- update auth.users
-- set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb
-- where email = 'your-admin-email@example.com';

-- Persistent site content and media. Run this section after the applications
-- schema above. The public site may read content and images; only the admin
-- account (raw_app_meta_data.role = admin) may change them.
create table if not exists public.site_settings (
  key text primary key check (key = 'site'),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.articles (
  id text primary key,
  title text not null default '',
  category text not null default '',
  excerpt text not null default '',
  content text,
  image text,
  date text not null,
  views integer not null default 0,
  read_time text
);

grant select on public.site_settings, public.articles to anon, authenticated;
grant insert, update, delete on public.site_settings, public.articles to authenticated;

alter table public.site_settings enable row level security;
alter table public.articles enable row level security;

drop policy if exists "Anyone can read site settings" on public.site_settings;
create policy "Anyone can read site settings"
on public.site_settings for select to anon, authenticated
using (true);

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
on public.site_settings for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Anyone can read articles" on public.articles;
create policy "Anyone can read articles"
on public.articles for select to anon, authenticated
using (true);

drop policy if exists "Admins can manage articles" on public.articles;
create policy "Admins can manage articles"
on public.articles for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can read site media" on storage.objects;
create policy "Admins can read site media"
on storage.objects for select to authenticated
using (
  bucket_id = 'site-media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "Admins can upload site media" on storage.objects;
create policy "Admins can upload site media"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'site-media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "Admins can update site media" on storage.objects;
create policy "Admins can update site media"
on storage.objects for update to authenticated
using (
  bucket_id = 'site-media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
with check (
  bucket_id = 'site-media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "Admins can delete site media" on storage.objects;
create policy "Admins can delete site media"
on storage.objects for delete to authenticated
using (
  bucket_id = 'site-media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);
