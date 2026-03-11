'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { getStreak, getQuizResults, type LocalStreak, type LocalQuizResult } from '@/lib/local-storage'

const statusColors: Record<string, string> = {
  'Disciplined Machine': 'text-emerald-400',
  'Mostly Focused': 'text-blue-400',
  'Slightly Cooked': 'text-amber-400',
  'Fully Cooked': 'text-red-400',
}

export default function ProfilePage() {
  const [streak, setStreak] = useState<LocalStreak>({ current_streak: 0, longest_streak: 0, last_activity_date: null, total_completed: 0 })
  const [quizResults, setQuizResults] = useState<LocalQuizResult[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setStreak(getStreak())
    setQuizResults(getQuizResults())
    setMounted(true)
  }, [])

  const { current_streak, longest_streak, total_completed } = streak

  const badges = [
    { emoji: '🥉', label: '3-Day Streak', description: 'Complete challenges 3 days in a row', earned: longest_streak >= 3 },
    { emoji: '🥇', label: '7-Day Streak', description: 'Complete challenges 7 days in a row', earned: longest_streak >= 7 },
    { emoji: '💎', label: '30-Day Streak', description: 'Complete challenges 30 days in a row', earned: longest_streak >= 30 },
    { emoji: '⚡', label: 'First Challenge', description: 'Complete your first challenge', earned: total_completed >= 1 },
    { emoji: '🔥', label: '10 Challenges', description: 'Complete 10 total challenges', earned: total_completed >= 10 },
    { emoji: '🏆', label: '50 Challenges', description: 'Complete 50 total challenges', earned: total_completed >= 50 },
  ]

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 flex items-center justify-center min-h-64">
        <div className="text-white/20 text-sm">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Profile header */}
      <div className="border border-white/10 rounded-2xl p-6 bg-white/2 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
          🎯
        </div>
        <div>
          <div className="font-semibold text-lg">Demo User</div>
          <div className="text-sm text-white/40 mt-0.5">Data stored locally in your browser</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          { emoji: '🔥', value: current_streak, label: 'Current Streak' },
          { emoji: '🏆', value: longest_streak, label: 'Best Streak' },
          { emoji: '⚡', value: total_completed, label: 'Total Challenges' },
        ].map(s => (
          <div key={s.label} className="border border-white/10 rounded-2xl p-5 bg-white/2">
            <div className="text-2xl mb-2">{s.emoji}</div>
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-xs text-white/40 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="border border-white/10 rounded-2xl p-6 bg-white/2">
        <h2 className="font-semibold text-white/70 text-sm uppercase tracking-widest mb-5">Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {badges.map(badge => (
            <Badge key={badge.label} {...badge} />
          ))}
        </div>
      </div>

      {/* Quiz history */}
      {quizResults.length > 0 && (
        <div className="border border-white/10 rounded-2xl p-6 bg-white/2">
          <h2 className="font-semibold text-white/70 text-sm uppercase tracking-widest mb-5">Quiz History</h2>
          <div className="space-y-3">
            {quizResults.map(qr => (
              <div key={qr.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <span className={`font-medium ${statusColors[qr.status] ?? 'text-white'}`}>{qr.status}</span>
                  <span className="text-xs text-white/30 ml-3">Score: {qr.score}/80</span>
                </div>
                <span className="text-xs text-white/30">
                  {new Date(qr.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Link href="/quiz" className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm text-center font-medium">
          Retake Quiz
        </Link>
        <Link href="/challenge" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity text-sm text-center">
          Get a Challenge
        </Link>
      </div>
    </div>
  )
}
