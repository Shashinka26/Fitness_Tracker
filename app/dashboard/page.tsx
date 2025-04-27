"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Calendar, Dumbbell, TrendingUp } from "lucide-react"
import WorkoutSummary from "@/components/workout-summary"
import ProgressChart from "@/components/progress-chart"
import RecentWorkouts from "@/components/recent-workouts"
import ProtectedRoute from "@/components/protected-route"
import { workouts } from "@/lib/mock-data"

export default function Dashboard() {
  const { user } = useAuth()
  const [stats] = useState({
    totalWorkouts: workouts.length,
    newWorkouts: 2,
    streak: 3,
    streakChange: 1,
    totalWeight: 2500,
    weightIncrease: 150,
    nextWorkout: "Tomorrow",
    nextWorkoutType: "Upper Body",
  })

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardNav />
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
                    <Dumbbell className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalWorkouts}</div>
                    <p className="text-xs text-muted-foreground">+{stats.newWorkouts} from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Streak</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.streak} days</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.streakChange > 0 ? "+" : ""}
                      {stats.streakChange} from last week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Weight Lifted</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalWeight} kg</div>
                    <p className="text-xs text-muted-foreground">+{stats.weightIncrease} kg from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Workout</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.nextWorkout}</div>
                    <p className="text-xs text-muted-foreground">{stats.nextWorkoutType}</p>
                  </CardContent>
                </Card>
              </div>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="workouts">Workouts</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="lg:col-span-4">
                      <CardHeader>
                        <CardTitle>Progress Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="pl-2">
                        <ProgressChart />
                      </CardContent>
                    </Card>
                    <Card className="lg:col-span-3">
                      <CardHeader>
                        <CardTitle>Recent Workouts</CardTitle>
                        <CardDescription>Your last 5 workout sessions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <RecentWorkouts workouts={workouts} />
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Workout Summary</CardTitle>
                      <CardDescription>Your workout activity for the past 4 weeks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <WorkoutSummary />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Analytics</CardTitle>
                      <CardDescription>View your performance metrics and progress over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center border rounded">
                        <p className="text-muted-foreground">Detailed analytics will appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="workouts" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Workout History</CardTitle>
                      <CardDescription>View and manage your workout history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center border rounded">
                        <p className="text-muted-foreground">Workout history will appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
