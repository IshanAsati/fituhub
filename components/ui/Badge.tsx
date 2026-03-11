interface BadgeProps {
  emoji: string
  label: string
  description: string
  earned: boolean
}

export default function Badge({ emoji, label, description, earned }: BadgeProps) {
  return (
    <div
      className={`rounded-xl p-4 border transition-all ${
        earned
          ? 'border-violet-500/40 bg-violet-500/10'
          : 'border-white/5 bg-white/3 opacity-40 grayscale'
      }`}
    >
      <div className="text-3xl mb-2">{emoji}</div>
      <div className="font-semibold text-sm">{label}</div>
      <div className="text-xs text-white/50 mt-1">{description}</div>
      {earned && (
        <div className="mt-2 text-xs text-violet-400 font-medium">✓ Earned</div>
      )}
    </div>
  )
}
