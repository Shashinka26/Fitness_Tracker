import type { Workout, UserStats } from "@/lib/types"

// Mock workout data - in a real app, this would be stored in a database
const mockWorkouts: Workout[] = [
  {
    id: "1",
    name: "Upper Body Strength",
    type: "strength",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    duration: 65, // minutes
    notes: "Felt good, increased bench press weight",
    exercises: [
      {
        id: "1",
        name: "Bench Press",
        sets: [
          { id: "1", reps: 10, weight: 60 },
          { id: "2", reps: 8, weight: 70 },
          { id: "3", reps: 6, weight: 80 },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "HIIT Session",
    type: "hiit",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    duration: 30, // minutes
    exercises: [],
  },
  {
    id: "3",
    name: "Leg Day",
    type: "strength",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
    duration: 75, // minutes
    exercises: [],
  },
  {
    id: "4",
    name: "Cardio",
    type: "cardio",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8), // 8 days ago
    duration: 45, // minutes
    exercises: [],
  },
  {
    id: "5",
    name: "Full Body Workout",
    type: "strength",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    duration: 60, // minutes
    exercises: [],
  },
]

export async function getUserWorkouts(userId: string): Promise<Workout[]> {
  // In a real app, you would fetch workouts from a database based on the user ID
  return mockWorkouts
}

export async function getUserStats(userId: string): Promise<UserStats> {
  // In a real app, you would calculate these stats based on actual user data
  return {
    totalWorkouts: 15,
    newWorkouts: 3,
    streak: 5,
    streakChange: 2,
    totalWeight: 2500,
    weightIncrease: 150,
    nextWorkout: "Tomorrow",
    nextWorkoutType: "Upper Body",
  }
}
