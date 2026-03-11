import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center space-y-6 mb-20">
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-medium border border-violet-500/30 text-violet-400 bg-violet-500/10 mb-4">
          For students who keep it real 🔥
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="gradient-text">Cooked</span>
          <span className="text-white/20 mx-4">or</span>
          <span className="text-white">Capable?</span>
        </h1>
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
          The brutally honest productivity app for students. Take the quiz, grab a challenge,
          build your streak. No fluff.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/quiz"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity text-sm"
          >
            Take the Quiz →
          </Link>
          <Link
            href="/challenge"
            className="px-8 py-3.5 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-colors text-sm"
          >
            Get a Challenge
          </Link>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {[
          {
            emoji: '🧠',
            title: 'Are You Cooked?',
            desc: '20-question quiz that tells you exactly where you stand.',
            href: '/quiz',
            color: 'from-violet-500/20 to-purple-600/20 border-violet-500/20',
          },
          {
            emoji: '⚡',
            title: 'Random Challenge',
            desc: 'Student, fitness, or creator mode. Hit the button, get moving.',
            href: '/challenge',
            color: 'from-emerald-500/20 to-green-600/20 border-emerald-500/20',
          },
          {
            emoji: '🔥',
            title: 'Streak System',
            desc: 'Complete one challenge daily. Watch your streak grow.',
            href: '/dashboard',
            color: 'from-orange-500/20 to-amber-600/20 border-orange-500/20',
          },
          {
            emoji: '📊',
            title: 'Dashboard',
            desc: 'All your stats, activity, and quiz history in one place.',
            href: '/dashboard',
            color: 'from-blue-500/20 to-indigo-600/20 border-blue-500/20',
          },
        ].map(card => (
          <Link
            key={card.title}
            href={card.href}
            className={`group p-6 rounded-2xl border bg-gradient-to-br ${card.color} hover:scale-[1.02] transition-all duration-200`}
          >
            <div className="text-3xl mb-4">{card.emoji}</div>
            <h3 className="font-semibold text-white mb-2">{card.title}</h3>
            <p className="text-sm text-white/50">{card.desc}</p>
          </Link>
        ))}
      </div>

      {/* Streak badges */}
      <div className="border border-white/5 rounded-2xl p-8 bg-white/2 text-center">
        <h2 className="text-xl font-bold mb-2">Earn Badges</h2>
        <p className="text-white/40 text-sm mb-8">Keep your streak going to unlock these</p>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { emoji: '🥉', label: '3-Day Streak', days: 3 },
            { emoji: '🥇', label: '7-Day Streak', days: 7 },
            { emoji: '💎', label: '30-Day Streak', days: 30 },
          ].map(b => (
            <div key={b.days} className="flex flex-col items-center gap-2 opacity-50">
              <div className="text-4xl">{b.emoji}</div>
              <span className="text-xs text-white/50">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
