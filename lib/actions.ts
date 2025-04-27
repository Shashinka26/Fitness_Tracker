"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { Workout } from "@/lib/types"

// Mock user data - in a real app, this would be stored in a database
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
]

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
]

export async function registerUser({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) {
  // Check if user already exists
  const existingUser = mockUsers.find((user) => user.email === email)

  if (existingUser) {
    return { success: false, error: "User with this email already exists" }
  }

  // In a real app, you would hash the password and store the user in a database
  const newUser = {
    id: String(mockUsers.length + 1),
    name,
    email,
    password, // In a real app, this would be hashed
  }

  mockUsers.push(newUser)

  // Set a cookie to simulate authentication
  cookies().set("userId", newUser.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return { success: true }
}

export async function loginUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  // Find user by email
  const user = mockUsers.find((user) => user.email === email)

  if (!user || user.password !== password) {
    return { success: false, error: "Invalid email or password" }
  }

  // Set a cookie to simulate authentication
  cookies().set("userId", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return { success: true }
}

export async function logoutUser() {
  cookies().delete("userId")
  redirect("/login")
}

export async function createWorkout({
  name,
  type,
  notes,
  exercises,
}: {
  name: string
  type: string
  notes?: string
  exercises: {
    name: string
    sets: {
      reps: number
      weight: number
    }[]
  }[]
}) {
  // Get the current user
  const userId = cookies().get("userId")?.value

  if (!userId) {
    return { success: false, error: "Not authenticated" }
  }

  // Create a new workout
  const newWorkout: Workout = {
    id: String(mockWorkouts.length + 1),
    name,
    type,
    date: new Date(),
    duration: 60, // Default duration
    notes,
    exercises: exercises.map((exercise, exerciseIndex) => ({
      id: String(exerciseIndex + 1),
      name: exercise.name,
      sets: exercise.sets.map((set, setIndex) => ({
        id: String(setIndex + 1),
        reps: set.reps,
        weight: set.weight,
      })),
    })),
  }

  mockWorkouts.push(newWorkout)

  return { success: true, workoutId: newWorkout.id }
}
