"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Sample data - in a real app, this would come from your API
const workoutData = [
  {
    name: "Week 1",
    strength: 3,
    cardio: 2,
    flexibility: 1,
  },
  {
    name: "Week 2",
    strength: 4,
    cardio: 1,
    flexibility: 2,
  },
  {
    name: "Week 3",
    strength: 3,
    cardio: 2,
    flexibility: 1,
  },
  {
    name: "Week 4",
    strength: 5,
    cardio: 1,
    flexibility: 2,
  },
]

export default function WorkoutSummary() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={workoutData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-3 gap-2">
                    {payload.map((entry) => (
                      <div key={entry.dataKey} className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">{entry.dataKey}</span>
                        <span className="font-bold" style={{ color: entry.color }}>
                          {entry.value} workouts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="strength" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="cardio" fill="hsl(var(--primary) / 0.7)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="flexibility" fill="hsl(var(--primary) / 0.4)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
