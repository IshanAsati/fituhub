'use client'

interface ProgressBarProps {
  value: number
  label: string
  color?: string
}

export default function ProgressBar({ value, label, color = 'from-violet-500 to-purple-600' }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="text-white font-semibold">{value}%</span>
      </div>
      <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
