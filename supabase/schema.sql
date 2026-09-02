-- VIE KING — Supabase schema
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query).

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- PRODUCTS
-- ---------------------------------------------------------------------------
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  colorway text not null,
  edition text not null,
  material text not null,
  price_cents integer not null check (price_cents >= 0),
  description text not null default '',
  story text not null default '',
  image_url text not null default '',
  gallery text[] not null default '{}',
  stock integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table products enable row level security;

-- Anyone can read active products (used by the public storefront).
create policy "Public can read active products"
  on products for select
  using (is_active = true);

-- Only the service role (used by /api/admin/*) can write. No public policy
-- is created for insert/update/delete, so the anon key can never modify data.

-- ---------------------------------------------------------------------------
-- ORDERS
-- ---------------------------------------------------------------------------
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  customer jsonb not null,
  lines jsonb not null,
  total_cents integer not null check (total_cents >= 0),
  status text not null default 'pending' check (status in ('pending','paid','fulfilled','cancelled')),
  payment_provider text not null default 'sumup',
  created_at timestamptz not null default now()
);

alter table orders enable row level security;
-- No public policies: orders are only ever read/written via the service role
-- from /api/checkout and /api/admin/orders, never directly from the browser.

-- ---------------------------------------------------------------------------
-- STORAGE — product photos
-- ---------------------------------------------------------------------------
-- Create a public bucket named "product-photos" from Storage → New bucket
-- (Public bucket: ON). Uploads go through /api/admin/upload using the
-- service role key, so no public upload policy is required.

-- ---------------------------------------------------------------------------
-- SEED DATA (optional) — mirrors src/data/mock-products.ts so the admin
-- dashboard has something to show immediately after connecting Supabase.
-- ---------------------------------------------------------------------------
insert into products (slug, name, colorway, edition, material, price_cents, description, story, image_url, gallery, stock, is_active)
values
  ('le-sacre', 'Le Sacre', 'Warm Ivory / Gold Thread', 'Edition No. 001', 'Brushed cotton canvas, hand-stitched crest', 12000, 'The coronation piece. Where the collection begins.', 'Named for the ceremony of crowning, Le Sacre carries a single gold thread across the brow.', 'https://picsum.photos/seed/vieking-le-sacre/1200/1500', '{}', 24, true),
  ('noir-regence', 'Noir Régence', 'Deep Black', 'Edition No. 002', 'Heavyweight wool blend, matte hardware', 13000, 'Authority, without a raised voice.', 'Noir Régence is cut for the room you walk into last.', 'https://picsum.photos/seed/vieking-noir/1200/1500', '{}', 31, true)
on conflict (slug) do nothing;
