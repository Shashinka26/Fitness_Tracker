"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data - in a real app, this would come from your API
const sampleData = [
  { date: "Week 1", weight: 100, reps: 8 },
  { date: "Week 2", weight: 105, reps: 8 },
  { date: "Week 3", weight: 110, reps: 7 },
  { date: "Week 4", weight: 110, reps: 8 },
  { date: "Week 5", weight: 115, reps: 7 },
  { date: "Week 6", weight: 115, reps: 8 },
  { date: "Week 7", weight: 120, reps: 6 },
  { date: "Week 8", weight: 120, reps: 7 },
]

export default function ProgressChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={sampleData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}kg`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Weight</span>
                      <span className="font-bold text-muted-foreground">{payload[0].value}kg</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Reps</span>
                      <span className="font-bold text-muted-foreground">{payload[1].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="weight"
          activeDot={{
            r: 6,
            style: { fill: "var(--primary)", opacity: 0.8 },
          }}
          style={{
            stroke: "var(--primary)",
          }}
        />
        <Line
          type="monotone"
          dataKey="reps"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "var(--muted-foreground)", opacity: 0.8 },
          }}
          style={{
            stroke: "var(--muted-foreground)",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
