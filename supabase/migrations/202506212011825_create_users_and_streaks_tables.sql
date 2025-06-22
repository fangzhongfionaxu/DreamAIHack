-- Create users table
create table public.users (
    id uuid references auth.users primary key,
    username text unique not null,
    full_name text,
    avatar_url text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    last_active timestamp with time zone,
    streak_count int default 0,
    total_practice_time int default 0
);

-- Create streaks table
create table public.streaks (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id),
    date date not null,
    practice_time int not null,
    photo_url text,
    created_at timestamp with time zone default now(),
    status text check (status in ('completed', 'missed', 'active')),
    constraint unique_user_date unique (user_id, date)
);

-- Set up RLS (Row Level Security) policies

-- Users table policies
alter table public.users enable row level security;

create policy "Users can read any profile."
    on public.users for select
    using (true);

create policy "Users can update their own profile."
    on public.users for update
    using (auth.uid() = id);

-- Streaks table policies
alter table public.streaks enable row level security;

create policy "Users can read their own streaks."
    on public.streaks for select
    using (auth.uid() = user_id);

create policy "Users can create their own streaks."
    on public.streaks for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own streaks."
    on public.streaks for update
    using (auth.uid() = user_id);