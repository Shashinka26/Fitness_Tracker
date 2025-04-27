export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface Workout {
  id: string
  name: string
  type: string
  date: Date
  duration: number
  notes?: string
  exercises: Exercise[]
}

export interface Exercise {
  id: string
  name: string
  sets: Set[]
}

export interface Set {
  id: string
  reps: number
  weight: number
}

export interface UserStats {
  totalWorkouts: number
  newWorkouts: number
  streak: number
  streakChange: number
  totalWeight: number
  weightIncrease: number
  nextWorkout: string | null
  nextWorkoutType: string | null
}
