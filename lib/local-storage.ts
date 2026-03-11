/**
 * localStorage-based persistence layer used when Supabase is not configured (demo/testing mode).
 * All data is keyed per "demo-user" and stored in the browser.
 */

export const isDemoMode =
  typeof window !== 'undefined' &&
  (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LocalQuizResult {
  id: string
  score: number
  status: string
  focus_level: number
  discipline_level: number
  distraction_level: number
  answers: number[]
  created_at: string
}

export interface LocalChallenge {
  id: string
  challenge_text: string
  category: string
  completed_at: string
}

export interface LocalStreak {
  current_streak: number
  longest_streak: number
  last_activity_date: string | null
  total_completed: number
}

// ─── Quiz Results ─────────────────────────────────────────────────────────────

export function saveQuizResult(result: Omit<LocalQuizResult, 'id' | 'created_at'>): void {
  const all = getQuizResults()
  all.unshift({ ...result, id: crypto.randomUUID(), created_at: new Date().toISOString() })
  localStorage.setItem('coc_quiz_results', JSON.stringify(all.slice(0, 20)))
}

export function getQuizResults(): LocalQuizResult[] {
  try {
    return JSON.parse(localStorage.getItem('coc_quiz_results') ?? '[]')
  } catch { return [] }
}

// ─── Challenges ───────────────────────────────────────────────────────────────

export function saveChallenge(challenge: Omit<LocalChallenge, 'id' | 'completed_at'>): void {
  const all = getChallenges()
  all.unshift({ ...challenge, id: crypto.randomUUID(), completed_at: new Date().toISOString() })
  localStorage.setItem('coc_challenges', JSON.stringify(all.slice(0, 100)))
  updateStreak()
}

export function getChallenges(): LocalChallenge[] {
  try {
    return JSON.parse(localStorage.getItem('coc_challenges') ?? '[]')
  } catch { return [] }
}

export function getRecentChallenges(n = 5): LocalChallenge[] {
  return getChallenges().slice(0, n)
}

export function getWeeklyActivity(): { date: string; count: number }[] {
  const challenges = getChallenges()
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split('T')[0]
  })
  const counts: Record<string, number> = {}
  days.forEach(d => { counts[d] = 0 })
  challenges.forEach(c => {
    const day = c.completed_at.split('T')[0]
    if (counts[day] !== undefined) counts[day]++
  })
  return days.map(d => ({ date: d, count: counts[d] }))
}

// ─── Streaks ──────────────────────────────────────────────────────────────────

export function getStreak(): LocalStreak {
  try {
    return JSON.parse(localStorage.getItem('coc_streak') ?? 'null') ?? {
      current_streak: 0,
      longest_streak: 0,
      last_activity_date: null,
      total_completed: 0,
    }
  } catch {
    return { current_streak: 0, longest_streak: 0, last_activity_date: null, total_completed: 0 }
  }
}

function updateStreak(): void {
  const streak = getStreak()
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  let newCurrent: number
  if (streak.last_activity_date === today) {
    newCurrent = streak.current_streak // Already counted today
  } else if (streak.last_activity_date === yesterdayStr) {
    newCurrent = streak.current_streak + 1
  } else {
    newCurrent = 1
  }

  const updated: LocalStreak = {
    current_streak: newCurrent,
    longest_streak: Math.max(streak.longest_streak, newCurrent),
    last_activity_date: today,
    total_completed: streak.total_completed + 1,
  }
  localStorage.setItem('coc_streak', JSON.stringify(updated))
}
