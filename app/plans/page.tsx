"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Dumbbell } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { workoutPlans } from "@/lib/mock-data"
import WorkoutPlanDetails from "@/components/workout-plan-details"

export default function WorkoutPlansPage() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleStartPlan = (planId: string) => {
    // In a real app, this would save the plan to the user's profile
    alert(`Plan ${planId} started! In a real app, this would be saved to your profile.`)
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardNav />
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Workout Plans</h1>

              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Plans</TabsTrigger>
                  <TabsTrigger value="beginner">Beginner</TabsTrigger>
                  <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {workoutPlans.map((plan) => (
                      <Card key={plan.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{plan.name}</CardTitle>
                              <CardDescription>{plan.description}</CardDescription>
                            </div>
                            <Badge
                              variant={
                                plan.level === "Beginner"
                                  ? "outline"
                                  : plan.level === "Intermediate"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {plan.level}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{plan.duration}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{plan.frequency}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Dumbbell className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{plan.workouts.filter((w) => w.exercises.length > 0).length} workouts per week</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" onClick={() => setSelectedPlan(plan.id)}>
                            View Details
                          </Button>
                          <Button onClick={() => handleStartPlan(plan.id)}>Start Plan</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="beginner" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {workoutPlans
                      .filter((plan) => plan.level === "Beginner")
                      .map((plan) => (
                        <Card key={plan.id}>
                          {/* Same card content as above */}
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                              </div>
                              <Badge variant="outline">{plan.level}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{plan.duration}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{plan.frequency}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Dumbbell className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>
                                {plan.workouts.filter((w) => w.exercises.length > 0).length} workouts per week
                              </span>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setSelectedPlan(plan.id)}>
                              View Details
                            </Button>
                            <Button onClick={() => handleStartPlan(plan.id)}>Start Plan</Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                {/* Similar content for intermediate and advanced tabs */}
                <TabsContent value="intermediate" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {workoutPlans
                      .filter((plan) => plan.level === "Intermediate")
                      .map((plan) => (
                        <Card key={plan.id}>
                          {/* Card content */}
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                              </div>
                              <Badge variant="secondary">{plan.level}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{plan.duration}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{plan.frequency}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Dumbbell className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>
                                {plan.workouts.filter((w) => w.exercises.length > 0).length} workouts per week
                              </span>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setSelectedPlan(plan.id)}>
                              View Details
                            </Button>
                            <Button onClick={() => handleStartPlan(plan.id)}>Start Plan</Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {workoutPlans
                      .filter((plan) => plan.level === "Advanced")
                      .map((plan) => (
                        <Card key={plan.id}>
                          {/* Card content */}
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                              </div>
                              <Badge variant="destructive">{plan.level}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{plan.duration}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{plan.frequency}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Dumbbell className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>
                                {plan.workouts.filter((w) => w.exercises.length > 0).length} workouts per week
                              </span>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setSelectedPlan(plan.id)}>
                              View Details
                            </Button>
                            <Button onClick={() => handleStartPlan(plan.id)}>Start Plan</Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>

      {selectedPlan && (
        <WorkoutPlanDetails
          planId={selectedPlan}
          plan={workoutPlans.find((p) => p.id === selectedPlan)!}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </ProtectedRoute>
  )
}
