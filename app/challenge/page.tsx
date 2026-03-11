'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { challenges, getRandomChallenge, categoryConfig, type ChallengeCategory } from '@/lib/challenge-data'
import { createClient } from '@/lib/supabase/client'
import confetti from 'canvas-confetti'

const categories: ChallengeCategory[] = ['student', 'fitness', 'creator']

export default function ChallengePage() {
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory>('student')
  const [current, setCurrent] = useState<{ text: string; category: ChallengeCategory } | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [recentChallenges, setRecentChallenges] = useState<string[]>([])
  const [totalToday, setTotalToday] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

  function generate() {
    setSpinning(true)
    setCompleted(false)

    // Brief shuffle animation then reveal
    let count = 0
    const interval = setInterval(() => {
      const fake = getRandomChallenge(selectedCategory)
      setCurrent(fake)
      count++
      if (count > 8) {
        clearInterval(interval)
        const final = getRandomChallenge(selectedCategory)
        setCurrent(final)
        setSpinning(false)
      }
    }, 80)
  }

  async function markComplete() {
    if (!current) return
    setCompleted(true)
    const newTotal = totalToday + 1
    setTotalToday(newTotal)
    setRecentChallenges(prev => [current.text, ...prev].slice(0, 5))

    // Confetti for milestones
    if (newTotal % 3 === 0) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#ec4899', '#6366f1'],
      })
    }

    // Save to Supabase
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('challenges_completed').insert({
        user_id: user.id,
        challenge_text: current.text,
        category: current.category,
      })

      // Update streak
      const { data: streak } = await supabase
        .from('streaks')
        .select('*')
        .eq('user_id', user.id)
        .single()

      const today = new Date().toISOString().split('T')[0]
      if (streak) {
        const last = streak.last_activity_date
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]

        const newStreak =
          last === today
            ? streak.current_streak
            : last === yesterdayStr
            ? streak.current_streak + 1
            : 1

        await supabase.from('streaks').update({
          current_streak: newStreak,
          longest_streak: Math.max(streak.longest_streak, newStreak),
          last_activity_date: today,
          total_completed: streak.total_completed + 1,
          updated_at: new Date().toISOString(),
        }).eq('user_id', user.id)
      } else {
        await supabase.from('streaks').insert({
          user_id: user.id,
          current_streak: 1,
          longest_streak: 1,
          last_activity_date: today,
          total_completed: 1,
        })
      }
    }
  }

  const cfg = categoryConfig[selectedCategory]

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Random Challenge</h1>
        <p className="text-white/40 text-sm">Pick a mode, hit generate, get moving.</p>
      </div>

      {/* Category selector */}
      <div className="grid grid-cols-3 gap-3">
        {categories.map(cat => {
          const c = categoryConfig[cat]
          const active = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrent(null); setCompleted(false) }}
              className={`p-4 rounded-xl border text-center transition-all duration-200 ${
                active
                  ? `bg-gradient-to-br ${c.color} border-transparent`
                  : 'border-white/10 hover:border-white/20 bg-white/2'
              }`}
            >
              <div className="text-2xl mb-1">{c.emoji}</div>
              <div className="text-xs font-medium text-white/80">{c.label}</div>
            </button>
          )
        })}
      </div>

      {/* Challenge card */}
      <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/2 min-h-[220px] flex flex-col items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {!current ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-3"
            >
              <div className="text-5xl">{cfg.emoji}</div>
              <p className="text-white/30 text-sm">Hit generate to get your challenge</p>
            </motion.div>
          ) : (
            <motion.div
              key={current.text}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4 w-full"
            >
              <div className="text-4xl">{categoryConfig[current.category].emoji}</div>
              <p className={`text-xl font-semibold ${spinning ? 'text-white/30' : 'text-white'} transition-colors`}>
                {current.text}
              </p>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryConfig[current.category].color} text-white`}>
                {categoryConfig[current.category].label}
              </div>

              {!spinning && !completed && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={markComplete}
                  className="block mx-auto mt-4 px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 transition-colors"
                >
                  ✓ Mark Complete
                </motion.button>
              )}

              {completed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-semibold"
                >
                  ✓ Completed! 🔥
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Generate button */}
      <button
        ref={buttonRef}
        onClick={generate}
        disabled={spinning}
        className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 bg-gradient-to-r ${cfg.color} hover:opacity-90 disabled:opacity-50 text-sm`}
      >
        {spinning ? 'Generating...' : '⚡ Generate Challenge'}
      </button>

      {/* Today's count */}
      {totalToday > 0 && (
        <div className="text-center text-sm text-white/30">
          {totalToday} challenge{totalToday !== 1 ? 's' : ''} completed today 🔥
        </div>
      )}

      {/* Recent challenges */}
      {recentChallenges.length > 0 && (
        <div className="border border-white/5 rounded-2xl p-5 bg-white/2">
          <h3 className="text-sm font-medium text-white/40 mb-4 uppercase tracking-widest">Recent Challenges</h3>
          <div className="space-y-2">
            {recentChallenges.map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-white/60">
                <span className="text-emerald-400 text-xs">✓</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        {categories.map(cat => (
          <div key={cat} className="border border-white/5 rounded-xl p-4">
            <div className="text-xl mb-1">{categoryConfig[cat].emoji}</div>
            <div className="text-xs text-white/30">{challenges.filter(c => c.category === cat).length} challenges</div>
          </div>
        ))}
      </div>
    </div>
  )
}
