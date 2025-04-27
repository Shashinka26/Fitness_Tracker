"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import WorkoutList from "@/components/workout-list"
import ProtectedRoute from "@/components/protected-route"
import type { Database } from "@/lib/database.types"

type Workout = Database["public"]["Tables"]["workouts"]["Row"]

export default function Workouts() {
  const { user } = useAuth()
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchWorkouts() {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from("workouts")
          .select("*")
          .eq("user_id", user.id)
          .order("date", { ascending: false })

        if (error) throw error
        setWorkouts(data || [])
      } catch (error) {
        console.error("Error fetching workouts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWorkouts()
  }, [user])

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardNav />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Workouts</h1>
              <Link href="/workouts/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Workout
                </Button>
              </Link>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Your Workouts</CardTitle>
                <CardDescription>View and manage your workout history</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex h-24 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
                  </div>
                ) : (
                  <WorkoutList workouts={workouts} />
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
