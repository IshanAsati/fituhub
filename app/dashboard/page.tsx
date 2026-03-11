'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import WeeklyGraph from '@/components/dashboard/WeeklyGraph'
import {
  getStreak,
  getRecentChallenges,
  getQuizResults,
  getWeeklyActivity,
  type LocalStreak,
  type LocalChallenge,
  type LocalQuizResult,
} from '@/lib/local-storage'

const categoryEmoji: Record<string, string> = {
  student: '📚',
  fitness: '💪',
  creator: '🎨',
}

const statusColors: Record<string, string> = {
  'Disciplined Machine': 'text-emerald-400',
  'Mostly Focused': 'text-blue-400',
  'Slightly Cooked': 'text-amber-400',
  'Fully Cooked': 'text-red-400',
}

export default function DashboardPage() {
  const [streak, setStreak] = useState<LocalStreak>({ current_streak: 0, longest_streak: 0, last_activity_date: null, total_completed: 0 })
  const [recent, setRecent] = useState<LocalChallenge[]>([])
  const [quiz, setQuiz] = useState<LocalQuizResult | null>(null)
  const [weekly, setWeekly] = useState<{ date: string; count: number }[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setStreak(getStreak())
    setRecent(getRecentChallenges(5))
    const results = getQuizResults()
    setQuiz(results[0] ?? null)
    setWeekly(getWeeklyActivity())
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 flex items-center justify-center min-h-64">
        <div className="text-white/20 text-sm">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Your stats, all in one place.</p>
        </div>
        <Link
          href="/challenge"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          ⚡ New Challenge
        </Link>
      </div>

      {/* Streak stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Current Streak', value: streak.current_streak, suffix: streak.current_streak === 1 ? 'day' : 'days', emoji: '🔥' },
          { label: 'Longest Streak', value: streak.longest_streak, suffix: streak.longest_streak === 1 ? 'day' : 'days', emoji: '🏆' },
          { label: 'Total Completed', value: streak.total_completed, suffix: 'challenges', emoji: '⚡' },
        ].map(stat => (
          <div key={stat.label} className="border border-white/10 rounded-2xl p-6 bg-white/2">
            <div className="text-3xl mb-3">{stat.emoji}</div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm text-white/40 mt-1">{stat.suffix}</div>
            <div className="text-xs text-white/20 mt-2">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly activity */}
      <div className="border border-white/10 rounded-2xl p-6 bg-white/2">
        <h2 className="font-semibold mb-6 text-white/70 text-sm uppercase tracking-widest">Weekly Activity</h2>
        <WeeklyGraph data={weekly} />
      </div>

      {/* Last quiz + recent challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Last quiz */}
        <div className="border border-white/10 rounded-2xl p-6 bg-white/2 space-y-4">
          <h2 className="font-semibold text-white/70 text-sm uppercase tracking-widest">Last Quiz Result</h2>
          {quiz ? (
            <>
              <div className={`text-2xl font-bold ${statusColors[quiz.status] ?? 'text-white'}`}>
                {quiz.status}
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Focus', value: quiz.focus_level, color: 'from-blue-500 to-indigo-600' },
                  { label: 'Discipline', value: quiz.discipline_level, color: 'from-violet-500 to-purple-600' },
                  { label: 'Distraction', value: quiz.distraction_level, color: 'from-red-500 to-rose-600' },
                ].map(m => (
                  <div key={m.label} className="space-y-1">
                    <div className="flex justify-between text-xs text-white/40">
                      <span>{m.label}</span>
                      <span>{m.value}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${m.color} rounded-full`} style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-white/20">
                {new Date(quiz.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <p className="text-white/30 text-sm">No quiz results yet.</p>
              <Link href="/quiz" className="inline-block px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs font-medium hover:bg-violet-500/30 transition-colors">
                Take the Quiz →
              </Link>
            </div>
          )}
        </div>

        {/* Recent challenges */}
        <div className="border border-white/10 rounded-2xl p-6 bg-white/2 space-y-4">
          <h2 className="font-semibold text-white/70 text-sm uppercase tracking-widest">Recent Challenges</h2>
          {recent.length > 0 ? (
            <div className="space-y-3">
              {recent.map(c => (
                <div key={c.id} className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{categoryEmoji[c.category] ?? '⚡'}</span>
                  <div>
                    <p className="text-sm text-white/80">{c.challenge_text}</p>
                    <p className="text-xs text-white/30 mt-0.5">
                      {new Date(c.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-white/30 text-sm">No challenges completed yet.</p>
              <Link href="/challenge" className="inline-block px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500/30 transition-colors">
                Get a Challenge →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
