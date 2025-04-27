"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { exerciseLibrary } from "@/lib/mock-data"
import ExerciseCard from "@/components/exercise-card"

export default function ExercisesPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter exercises based on search query and active tab
  const filteredExercises = exerciseLibrary.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && exercise.muscleGroup.toLowerCase() === activeTab.toLowerCase()
  })

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardNav />
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Exercise Library</h1>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search exercises..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="chest">Chest</TabsTrigger>
                  <TabsTrigger value="back">Back</TabsTrigger>
                  <TabsTrigger value="legs">Legs</TabsTrigger>
                  <TabsTrigger value="shoulders">Shoulders</TabsTrigger>
                  <TabsTrigger value="arms">Arms</TabsTrigger>
                  <TabsTrigger value="core">Core</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                  {filteredExercises.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredExercises.map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex h-40 items-center justify-center">
                        <p className="text-muted-foreground">No exercises found matching your search.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
