"use client"

import { formatDistanceToNow } from "date-fns"
import { Dumbbell } from "lucide-react"

interface Workout {
  id: string
  name: string
  type: string
  date: Date
  duration: number
  notes?: string
}

interface RecentWorkoutsProps {
  workouts: Workout[]
}

export default function RecentWorkouts({ workouts }: RecentWorkoutsProps) {
  if (workouts.length === 0) {
    return (
      <div className="flex h-full items-center justify-center py-8">
        <p className="text-muted-foreground">No recent workouts found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <div key={workout.id} className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <Dumbbell className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{workout.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(workout.date, { addSuffix: true })} • {workout.duration} min
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
