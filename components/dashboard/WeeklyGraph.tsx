'use client'

interface DayData {
  date: string
  count: number
}

export default function WeeklyGraph({ data }: { data: DayData[] }) {
  const max = Math.max(...data.map(d => d.count), 1)
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="flex items-end gap-2 h-24">
      {data.map((day) => {
        const d = new Date(day.date + 'T12:00:00')
        const label = dayLabels[d.getDay()]
        const height = day.count === 0 ? 4 : Math.max(8, (day.count / max) * 96)
        const isToday = day.date === new Date().toISOString().split('T')[0]

        return (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
            <div className="flex-1 flex items-end w-full">
              <div
                className={`w-full rounded-t-md transition-all duration-500 ${
                  day.count > 0
                    ? 'bg-gradient-to-t from-violet-600 to-purple-500'
                    : 'bg-white/5'
                } ${isToday ? 'ring-1 ring-violet-400/50' : ''}`}
                style={{ height: `${height}px` }}
                title={`${day.count} challenge${day.count !== 1 ? 's' : ''}`}
              />
            </div>
            <span className={`text-xs ${isToday ? 'text-violet-400 font-medium' : 'text-white/30'}`}>
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
