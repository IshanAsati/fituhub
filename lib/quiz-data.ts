export interface QuizQuestion {
  id: number
  question: string
  answers: { text: string; score: number }[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'How long were you on social media today?',
    answers: [
      { text: 'Less than 30 minutes', score: 1 },
      { text: '1–2 hours', score: 2 },
      { text: '3–4 hours', score: 3 },
      { text: 'I basically live there', score: 4 },
    ],
  },
  {
    id: 2,
    question: 'How often do you check your phone while studying?',
    answers: [
      { text: 'Almost never', score: 1 },
      { text: 'Every 30 minutes', score: 2 },
      { text: 'Every 10 minutes', score: 3 },
      { text: 'Constantly', score: 4 },
    ],
  },
  {
    id: 3,
    question: 'When do you usually start studying?',
    answers: [
      { text: 'Early afternoon', score: 1 },
      { text: 'Evening', score: 2 },
      { text: 'Late night', score: 3 },
      { text: 'I procrastinate until panic mode', score: 4 },
    ],
  },
  {
    id: 4,
    question: 'Do you keep a study schedule?',
    answers: [
      { text: 'Yes and I follow it', score: 1 },
      { text: 'I have one but rarely follow it', score: 2 },
      { text: 'I tried once', score: 3 },
      { text: 'What schedule?', score: 4 },
    ],
  },
  {
    id: 5,
    question: 'How many hours of focused study did you do today?',
    answers: [
      { text: '4+ hours', score: 1 },
      { text: '2–3 hours', score: 2 },
      { text: '1 hour', score: 3 },
      { text: 'Almost none', score: 4 },
    ],
  },
  {
    id: 6,
    question: 'Do you revise previous material?',
    answers: [
      { text: 'Daily', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Rarely', score: 3 },
      { text: 'Never', score: 4 },
    ],
  },
  {
    id: 7,
    question: 'Your study environment is usually:',
    answers: [
      { text: 'Quiet and organized', score: 1 },
      { text: 'Some distractions', score: 2 },
      { text: 'Pretty messy', score: 3 },
      { text: 'Absolute chaos', score: 4 },
    ],
  },
  {
    id: 8,
    question: 'How often do you procrastinate?',
    answers: [
      { text: 'Rarely', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Often', score: 3 },
      { text: 'Constantly', score: 4 },
    ],
  },
  {
    id: 9,
    question: 'Your sleep schedule is:',
    answers: [
      { text: 'Consistent', score: 1 },
      { text: 'Slightly irregular', score: 2 },
      { text: 'Pretty bad', score: 3 },
      { text: 'Completely destroyed', score: 4 },
    ],
  },
  {
    id: 10,
    question: 'How often do you finish assignments early?',
    answers: [
      { text: 'Always', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Rarely', score: 3 },
      { text: 'Never', score: 4 },
    ],
  },
  {
    id: 11,
    question: 'Do you take notes while studying?',
    answers: [
      { text: 'Always and thoroughly', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Rarely', score: 3 },
      { text: 'Never', score: 4 },
    ],
  },
  {
    id: 12,
    question: 'How often do you review your mistakes?',
    answers: [
      { text: 'After every test or quiz', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Rarely', score: 3 },
      { text: 'Never', score: 4 },
    ],
  },
  {
    id: 13,
    question: 'How often do you rewatch lectures?',
    answers: [
      { text: 'Only when I need to clarify something', score: 1 },
      { text: 'Occasionally for review', score: 2 },
      { text: 'Often because I missed things', score: 3 },
      { text: "I never watched them the first time", score: 4 },
    ],
  },
  {
    id: 14,
    question: 'Do you track your academic progress?',
    answers: [
      { text: 'Yes, consistently', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Rarely', score: 3 },
      { text: 'Never', score: 4 },
    ],
  },
  {
    id: 15,
    question: 'Do you plan your next study day the night before?',
    answers: [
      { text: 'Every night', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Rarely', score: 3 },
      { text: 'Never', score: 4 },
    ],
  },
  {
    id: 16,
    question: 'How often do you get distracted by YouTube?',
    answers: [
      { text: 'Rarely — I have discipline', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Often', score: 3 },
      { text: "Always — I'm basically a full-time viewer", score: 4 },
    ],
  },
  {
    id: 17,
    question: 'How often do you skip studying entirely?',
    answers: [
      { text: 'Never', score: 1 },
      { text: 'Rarely', score: 2 },
      { text: 'Sometimes', score: 3 },
      { text: 'More often than I study', score: 4 },
    ],
  },
  {
    id: 18,
    question: 'How do you manage study sessions?',
    answers: [
      { text: 'Structured breaks (Pomodoro or similar)', score: 1 },
      { text: 'I take breaks when I feel like it', score: 2 },
      { text: 'I study until I burn out', score: 3 },
      { text: "I don't really study long enough to need breaks", score: 4 },
    ],
  },
  {
    id: 19,
    question: 'How organized are your notes?',
    answers: [
      { text: 'Very organized with clear structure', score: 1 },
      { text: 'Somewhat organized', score: 2 },
      { text: 'Pretty messy', score: 3 },
      { text: 'What notes?', score: 4 },
    ],
  },
  {
    id: 20,
    question: 'How motivated do you feel about studying right now?',
    answers: [
      { text: 'Highly motivated and focused', score: 1 },
      { text: 'Somewhat motivated', score: 2 },
      { text: 'Low motivation', score: 3 },
      { text: 'Completely unmotivated', score: 4 },
    ],
  },
]

export interface QuizResultData {
  score: number
  status: string
  focusLevel: number
  disciplineLevel: number
  distractionLevel: number
  recommendation: string
  emoji: string
}

export function calculateResult(answers: number[]): QuizResultData {
  const score = answers.reduce((sum, a) => sum + a, 0)

  // Percentages calibrated so that a max-cooked score gives ~32% focus, ~40% discipline
  const focusLevel = Math.round(Math.max(0, Math.min(100, 100 - ((score - 20) / 60) * 68)))
  const disciplineLevel = Math.round(Math.max(0, Math.min(100, 100 - ((score - 20) / 60) * 60)))
  const distractionLevel = Math.round(Math.max(0, Math.min(100, ((score - 20) / 60) * 80)))

  let status: string
  let recommendation: string
  let emoji: string

  if (score <= 35) {
    status = 'Disciplined Machine'
    recommendation = "You're locked in. Keep the momentum going — you're built different."
    emoji = '🏆'
  } else if (score <= 50) {
    status = 'Mostly Focused'
    recommendation = 'Not bad. A few tweaks and you\'ll be unstoppable. Keep pushing.'
    emoji = '💪'
  } else if (score <= 65) {
    status = 'Slightly Cooked'
    recommendation = "You're getting there... or maybe not. Time to cut the distractions and lock in."
    emoji = '🔥'
  } else {
    status = 'Fully Cooked'
    recommendation = 'Close social media. Open your textbook. Try again tomorrow.'
    emoji = '💀'
  }

  return { score, status, focusLevel, disciplineLevel, distractionLevel, recommendation, emoji }
}
