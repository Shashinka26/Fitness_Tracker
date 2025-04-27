"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

// Define user type
export interface User {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => void
}

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
  },
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("fittrack_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const signUp = async (name: string, email: string, password: string) => {
    // Check if user already exists
    const existingUser = MOCK_USERS.find((u) => u.email === email)
    if (existingUser) {
      return { success: false, error: "User with this email already exists" }
    }

    // Create new user
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      name,
      email,
      password,
    }

    // Add to mock users
    MOCK_USERS.push(newUser)

    // Set current user (without password)
    const userWithoutPassword = { id: newUser.id, name: newUser.name, email: newUser.email }
    setUser(userWithoutPassword)
    localStorage.setItem("fittrack_user", JSON.stringify(userWithoutPassword))

    return { success: true }
  }

  const signIn = async (email: string, password: string) => {
    // Find user
    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)
    if (!foundUser) {
      return { success: false, error: "Invalid email or password" }
    }

    // Set current user (without password)
    const userWithoutPassword = { id: foundUser.id, name: foundUser.name, email: foundUser.email }
    setUser(userWithoutPassword)
    localStorage.setItem("fittrack_user", JSON.stringify(userWithoutPassword))

    return { success: true }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("fittrack_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
