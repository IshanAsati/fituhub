# Cooked or Capable 🔥

> The brutally honest productivity app for students.

A fun productivity web app that combines a self-assessment quiz, random challenge generator, and streak tracking system — built with a dark modern UI.

## Features

- **Are You Cooked?** — 20-question productivity quiz with 4 result tiers (Disciplined Machine → Fully Cooked)
- **Random Challenge Generator** — 90 challenges across Student 📚, Fitness 💪, and Creator 🎨 modes
- **Streak System** — Daily challenge tracking with current/longest streak and milestone badges
- **Dashboard** — Weekly activity graph, quiz history, and stats
- **Profile** — Unlockable badges for streak milestones

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (Auth + Database)
- [Framer Motion](https://www.framer.com/motion/) (Animations)
- [canvas-confetti](https://github.com/catdad/canvas-confetti) (Celebrations)

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/IshanAsati/fituhub.git
cd fituhub
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase-schema.sql` in the Supabase SQL editor
3. Copy your project URL and anon key

### 3. Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/IshanAsati/fituhub)

1. Import the repo in [Vercel](https://vercel.com)
2. Add environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
3. Deploy

## Database Schema

Run `supabase-schema.sql` in your Supabase project. Creates:

- `quiz_results` — stores quiz scores and metrics per user
- `challenges_completed` — tracks completed challenges with category
- `streaks` — current/longest streak and total challenge count

All tables have Row Level Security enabled.

## Pages

| Route | Description |
|-------|-------------|
| `/home` | Landing page |
| `/quiz` | 20-question productivity quiz |
| `/challenge` | Random challenge generator |
| `/dashboard` | Stats and activity overview |
| `/profile` | Badges, history, and account |
| `/login` | Auth (email + password) |
