-- Add missing columns to existing products table
alter table products add column if not exists slug text unique;
alter table products add column if not exists name text;
alter table products add column if not exists category text;
alter table products add column if not exists price numeric;
alter table products add column if not exists original_price numeric;
alter table products add column if not exists rating numeric default 0;
alter table products add column if not exists reviews integer default 0;
alter table products add column if not exists badge text;
alter table products add column if not exists image_url text;
alter table products add column if not exists colors text[] default '{}';
alter table products add column if not exists sizes text[] default '{}';
alter table products add column if not exists description text;
alter table products add column if not exists created_at timestamptz default now();

-- Create wishlist table if not exists
create table if not exists wishlist (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id text references products(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, product_id)
);

-- Create orders table if not exists
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  product_name text not null,
  price numeric not null,
  status text default 'pending',
  quantity integer default 1,
  created_at timestamptz default now()
);

-- Create likes table if not exists
create table if not exists likes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id text references products(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, product_id)
);

-- Create profiles table if not exists
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  avatar_url text,
  phone text,
  email text,
  created_at timestamptz default now()
);

-- Row Level Security
alter table wishlist enable row level security;
alter table orders enable row level security;
alter table likes enable row level security;
alter table profiles enable row level security;

-- Wishlist policies
do $$ begin
  create policy "Users read own wishlist" on wishlist for select using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Users insert own wishlist" on wishlist for insert with check (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Users delete own wishlist" on wishlist for delete using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

-- Orders policies
do $$ begin
  create policy "Users read own orders" on orders for select using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Users insert own orders" on orders for insert with check (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

-- Likes policies
do $$ begin
  create policy "Users read own likes" on likes for select using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Users insert own likes" on likes for insert with check (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Users delete own likes" on likes for delete using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

-- Profiles policies
do $$ begin
  create policy "Users read own profile" on profiles for select using (auth.uid() = id);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Users update own profile" on profiles for update using (auth.uid() = id);
exception when duplicate_object then null;
end $$;

-- Enable realtime
do $$ begin
  alter publication supabase_realtime add table wishlist;
exception when duplicate_object then null;
end $$;
do $$ begin
  alter publication supabase_realtime add table orders;
exception when duplicate_object then null;
end $$;
do $$ begin
  alter publication supabase_realtime add table likes;
exception when duplicate_object then null;
end $$;
