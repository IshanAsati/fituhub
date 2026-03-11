-- Supabase SQL Schema for Cooked or Capable
-- Run this in the Supabase SQL editor

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Quiz results table
create table if not exists quiz_results (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  score integer not null,
  status text not null,
  focus_level integer not null,
  discipline_level integer not null,
  distraction_level integer not null,
  answers jsonb not null default '[]',
  created_at timestamptz default now() not null
);

-- Challenges completed table
create table if not exists challenges_completed (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  challenge_text text not null,
  category text not null,
  completed_at timestamptz default now() not null
);

-- Streaks table
create table if not exists streaks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  current_streak integer default 0 not null,
  longest_streak integer default 0 not null,
  last_activity_date date,
  total_completed integer default 0 not null,
  updated_at timestamptz default now() not null
);

-- Row Level Security
alter table quiz_results enable row level security;
alter table challenges_completed enable row level security;
alter table streaks enable row level security;

-- RLS Policies: users can only see/edit their own data
create policy "Users can manage own quiz results"
  on quiz_results for all using (auth.uid() = user_id);

create policy "Users can manage own challenges"
  on challenges_completed for all using (auth.uid() = user_id);

create policy "Users can manage own streaks"
  on streaks for all using (auth.uid() = user_id);
