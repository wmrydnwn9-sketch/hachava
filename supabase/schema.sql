create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  business_name text not null default 'החווה',
  slogan text not null default 'מהמשק לצלחת',
  phone text not null default '050-0000000',
  whatsapp_url text not null default 'https://wa.me/972500000000',
  email text not null default 'hachava2026@gmail.com',
  instagram_url text not null default 'https://www.instagram.com/hachava_meat',
  address text not null default 'קניון גנים',
  hero_title text not null default 'בשר איכותי מהמשק',
  hero_subtitle text not null default 'קצביית פרימיום עם אווירה כפרית חמה, שירות אישי ובשר מובחר — מהמשק לצלחת.',
  about_title text not null default 'על החווה',
  about_body text not null default 'בהחווה אנחנו מאמינים שבשר איכותי מתחיל במקצוענות, טריות וכבוד לחומר הגלם. אנו מגישים חוויית קנייה חמה, משפחתית ויוקרתית, עם הקפדה על איכות בלתי מתפשרת — מהמשק לצלחת.',
  kosher_label text not null default 'כשר',
  map_embed_url text,
  logo_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.product_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_he text not null,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.product_categories(id) on delete cascade,
  name_he text not null,
  description_he text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),
  title_he text not null,
  description_he text not null,
  image_url text,
  is_active boolean not null default false,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create type public.order_type as enum ('delivery', 'pickup');
create type public.order_status as enum ('pending', 'approved', 'completed', 'canceled');

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text,
  notes text,
  order_type public.order_type not null,
  status public.order_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  product_name_snapshot text not null,
  quantity integer not null check (quantity > 0)
);
