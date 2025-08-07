-- Supabase SQL Schema for RoastMe App

-- Enable RLS (Row Level Security)
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique not null,
  email text unique not null,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  level integer default 1 not null,
  xp integer default 0 not null,
  is_private boolean default false not null,
  filter_mode_enabled boolean default true not null,
  approve_roasts_first boolean default false not null
);

-- Create roasts table
create table public.roasts (
  id uuid default gen_random_uuid() not null primary key,
  content text not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  target_user_id uuid references public.profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  upvotes integer default 0 not null,
  downvotes integer default 0 not null,
  is_hidden boolean default false not null,
  is_flagged boolean default false not null,
  parent_id uuid references public.roasts(id) on delete cascade
);

-- Create votes table to track user votes on roasts
create table public.votes (
  id uuid default gen_random_uuid() not null primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  roast_id uuid references public.roasts(id) on delete cascade not null,
  vote_type text not null check (vote_type in ('upvote', 'downvote')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, roast_id)
);

-- Create achievements table
create table public.achievements (
  id uuid default gen_random_uuid() not null primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null,
  title text not null,
  description text not null,
  icon_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create notifications table
create table public.notifications (
  id uuid default gen_random_uuid() not null primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  type text not null,
  related_id uuid,
  is_read boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies

-- Profiles table policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (not is_private);

create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Roasts table policies
create policy "Roasts are viewable by everyone"
  on roasts for select
  using (true);

create policy "Users can create roasts"
  on roasts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own roasts"
  on roasts for update
  using (auth.uid() = user_id);

-- Votes table policies
create policy "Users can view all votes"
  on votes for select
  using (true);

create policy "Users can cast votes"
  on votes for insert
  with check (auth.uid() = user_id);

create policy "Users can change their votes"
  on votes for update
  using (auth.uid() = user_id);

create policy "Users can delete their votes"
  on votes for delete
  using (auth.uid() = user_id);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.roasts enable row level security;
alter table public.votes enable row level security;
alter table public.achievements enable row level security;
alter table public.notifications enable row level security;

-- Function to handle upvotes and downvotes
create or replace function handle_vote()
returns trigger as $$
begin
  -- If it's a new vote
  if (TG_OP = 'INSERT') then
    -- Update the roast upvotes/downvotes count
    if (NEW.vote_type = 'upvote') then
      update roasts set upvotes = upvotes + 1 where id = NEW.roast_id;
    elsif (NEW.vote_type = 'downvote') then
      update roasts set downvotes = downvotes + 1 where id = NEW.roast_id;
    end if;
  -- If vote is being updated
  elsif (TG_OP = 'UPDATE') then
    -- If vote changed from upvote to downvote
    if (OLD.vote_type = 'upvote' and NEW.vote_type = 'downvote') then
      update roasts set upvotes = upvotes - 1, downvotes = downvotes + 1 where id = NEW.roast_id;
    -- If vote changed from downvote to upvote
    elsif (OLD.vote_type = 'downvote' and NEW.vote_type = 'upvote') then
      update roasts set upvotes = upvotes + 1, downvotes = downvotes - 1 where id = NEW.roast_id;
    end if;
  -- If vote is being deleted
  elsif (TG_OP = 'DELETE') then
    -- Decrement the appropriate counter
    if (OLD.vote_type = 'upvote') then
      update roasts set upvotes = upvotes - 1 where id = OLD.roast_id;
    elsif (OLD.vote_type = 'downvote') then
      update roasts set downvotes = downvotes - 1 where id = OLD.roast_id;
    end if;
  end if;
  return NEW;
end;
$$ language plpgsql security definer;

-- Create trigger for vote handling
create trigger on_vote_change
  after insert or update or delete on public.votes
  for each row execute function handle_vote();

-- Function to update XP when a user receives upvotes
create or replace function update_xp_on_vote()
returns trigger as $$
declare
  roast_author_id uuid;
begin
  -- Get the author of the roast
  select user_id into roast_author_id from roasts where id = NEW.roast_id;
  
  -- Update XP based on vote type
  if (NEW.vote_type = 'upvote') then
    -- Add 10 XP for upvotes
    update profiles set xp = xp + 10 where id = roast_author_id;
    
    -- Check if level up is needed (every 100 XP)
    update profiles 
    set level = level + 1
    where id = roast_author_id and xp >= level * 100;
  end if;
  
  return NEW;
end;
$$ language plpgsql security definer;

-- Create trigger for XP updates
create trigger on_vote_update_xp
  after insert on public.votes
  for each row execute function update_xp_on_vote();
