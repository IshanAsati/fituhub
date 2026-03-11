'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizQuestions, calculateResult, type QuizResultData } from '@/lib/quiz-data'
import ProgressBar from '@/components/ui/ProgressBar'
import { saveQuizResult } from '@/lib/local-storage'
import Link from 'next/link'

const SUPABASE_READY = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

type Phase = 'intro' | 'quiz' | 'result'

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [result, setResult] = useState<QuizResultData | null>(null)
  const [saving, setSaving] = useState(false)

  const question = quizQuestions[currentQ]
  const progress = ((currentQ) / quizQuestions.length) * 100

  function handleAnswer(score: number) {
    setSelected(score)
    setTimeout(() => {
      const newAnswers = [...answers, score]
      if (currentQ + 1 < quizQuestions.length) {
        setAnswers(newAnswers)
        setCurrentQ(currentQ + 1)
        setSelected(null)
      } else {
        const res = calculateResult(newAnswers)
        setResult(res)
        setPhase('result')
        saveResult(newAnswers, res)
      }
    }, 350)
  }

  async function saveResult(ans: number[], res: QuizResultData) {
    setSaving(true)
    // Save to localStorage always (works in demo mode)
    saveQuizResult({
      score: res.score,
      status: res.status,
      focus_level: res.focusLevel,
      discipline_level: res.disciplineLevel,
      distraction_level: res.distractionLevel,
      answers: ans,
    })

    // Also save to Supabase if configured
    if (SUPABASE_READY) {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('quiz_results').insert({
          user_id: user.id,
          score: res.score,
          status: res.status,
          focus_level: res.focusLevel,
          discipline_level: res.disciplineLevel,
          distraction_level: res.distractionLevel,
          answers: ans,
        })
      }
    }
    setSaving(false)
  }

  function restart() {
    setPhase('intro')
    setCurrentQ(0)
    setAnswers([])
    setSelected(null)
    setResult(null)
  }

  const statusColors: Record<string, string> = {
    'Disciplined Machine': 'from-emerald-500 to-green-600',
    'Mostly Focused': 'from-blue-500 to-indigo-600',
    'Slightly Cooked': 'from-orange-500 to-amber-600',
    'Fully Cooked': 'from-red-500 to-rose-600',
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <AnimatePresence mode="wait">

        {/* Intro */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="text-6xl mb-6">🧠</div>
            <h1 className="text-4xl font-bold">Are You Cooked?</h1>
            <p className="text-white/50 text-lg leading-relaxed">
              20 questions. Brutally honest results. Find out exactly where you stand
              on the productivity spectrum.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-white/40">
              <span>📊 20 questions</span>
              <span>⏱ ~3 minutes</span>
              <span>🎯 Instant results</span>
            </div>
            <button
              onClick={() => setPhase('quiz')}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity mt-4"
            >
              Start Quiz →
            </button>
          </motion.div>
        )}

        {/* Quiz */}
        {phase === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/40">
                <span>Question {currentQ + 1} of {quizQuestions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold leading-snug">
                  {question.question}
                </h2>

                <div className="space-y-3">
                  {question.answers.map((answer, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(answer.score)}
                      disabled={selected !== null}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm font-medium ${
                        selected === answer.score
                          ? 'border-violet-500 bg-violet-500/20 text-white'
                          : selected !== null
                          ? 'border-white/5 bg-white/2 text-white/30'
                          : 'border-white/10 bg-white/5 text-white hover:border-violet-500/50 hover:bg-violet-500/10'
                      }`}
                    >
                      <span className="text-white/30 mr-3 font-mono text-xs">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {answer.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Result */}
        {phase === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Status banner */}
            <div className={`rounded-2xl p-8 text-center bg-gradient-to-br ${statusColors[result.status] ?? 'from-violet-500 to-purple-600'} bg-opacity-20`}>
              <div className="text-6xl mb-4">{result.emoji}</div>
              <div className="text-sm text-white/70 mb-2 uppercase tracking-widest">Your Status</div>
              <h2 className="text-4xl font-bold mb-2">{result.status}</h2>
              <div className="text-white/60 text-sm">Score: {result.score} / 80</div>
            </div>

            {/* Metrics */}
            <div className="border border-white/10 rounded-2xl p-6 bg-white/2 space-y-5">
              <h3 className="font-semibold text-white/70 text-sm uppercase tracking-widest">Your Stats</h3>
              <ProgressBar
                value={result.focusLevel}
                label="Focus Level"
                color="from-blue-500 to-indigo-600"
              />
              <ProgressBar
                value={result.disciplineLevel}
                label="Discipline Level"
                color="from-violet-500 to-purple-600"
              />
              <ProgressBar
                value={result.distractionLevel}
                label="Distraction Level"
                color="from-red-500 to-rose-600"
              />
            </div>

            {/* Recommendation */}
            <div className="border border-white/10 rounded-2xl p-6 bg-white/2">
              <h3 className="text-sm text-white/40 mb-3 uppercase tracking-widest">Recommendation</h3>
              <p className="text-white text-lg leading-relaxed italic">
                &ldquo;{result.recommendation}&rdquo;
              </p>
            </div>

            {saving && <p className="text-center text-sm text-white/30">Saving result...</p>}

            <div className="flex gap-3">
              <button
                onClick={restart}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors text-sm"
              >
                Try Again
              </button>
              <Link
                href="/challenge"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity text-sm text-center"
              >
                Get a Challenge →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
