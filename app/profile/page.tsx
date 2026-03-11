import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [{ data: streak }, { data: quizResults }] = await Promise.all([
    supabase.from('streaks').select('*').eq('user_id', user.id).single(),
    supabase.from('quiz_results').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
  ])

  const currentStreak = streak?.current_streak ?? 0
  const longestStreak = streak?.longest_streak ?? 0
  const totalCompleted = streak?.total_completed ?? 0

  const badges = [
    {
      emoji: '🥉',
      label: '3-Day Streak',
      description: 'Complete challenges 3 days in a row',
      earned: longestStreak >= 3,
    },
    {
      emoji: '🥇',
      label: '7-Day Streak',
      description: 'Complete challenges 7 days in a row',
      earned: longestStreak >= 7,
    },
    {
      emoji: '💎',
      label: '30-Day Streak',
      description: 'Complete challenges 30 days in a row',
      earned: longestStreak >= 30,
    },
    {
      emoji: '⚡',
      label: 'First Challenge',
      description: 'Complete your first challenge',
      earned: totalCompleted >= 1,
    },
    {
      emoji: '🔥',
      label: '10 Challenges',
      description: 'Complete 10 total challenges',
      earned: totalCompleted >= 10,
    },
    {
      emoji: '🏆',
      label: '50 Challenges',
      description: 'Complete 50 total challenges',
      earned: totalCompleted >= 50,
    },
  ]

  const statusColors: Record<string, string> = {
    'Disciplined Machine': 'text-emerald-400',
    'Mostly Focused': 'text-blue-400',
    'Slightly Cooked': 'text-amber-400',
    'Fully Cooked': 'text-red-400',
  }

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Profile header */}
      <div className="border border-white/10 rounded-2xl p-6 bg-white/2 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
            {user.email?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div>
            <div className="font-semibold text-lg">{user.email}</div>
            <div className="text-sm text-white/40 mt-0.5">
              Member since {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-colors text-sm"
          >
            Sign Out
          </button>
        </form>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          { emoji: '🔥', value: currentStreak, label: 'Current Streak' },
          { emoji: '🏆', value: longestStreak, label: 'Best Streak' },
          { emoji: '⚡', value: totalCompleted, label: 'Total Challenges' },
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
      {quizResults && quizResults.length > 0 && (
        <div className="border border-white/10 rounded-2xl p-6 bg-white/2">
          <h2 className="font-semibold text-white/70 text-sm uppercase tracking-widest mb-5">Quiz History</h2>
          <div className="space-y-3">
            {quizResults.map(qr => (
              <div key={qr.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <span className={`font-medium ${statusColors[qr.status] ?? 'text-white'}`}>
                    {qr.status}
                  </span>
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

      {/* CTA */}
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
