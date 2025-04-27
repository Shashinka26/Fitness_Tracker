"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Dumbbell } from "lucide-react"

interface WorkoutPlan {
  id: string
  name: string
  description: string
  level: string
  duration: string
  frequency: string
  workouts: {
    day: number
    name: string
    exercises: {
      name: string
      sets: number
      reps: string
    }[]
  }[]
}

interface WorkoutPlanDetailsProps {
  planId: string
  plan: WorkoutPlan
  onClose: () => void
}

export default function WorkoutPlanDetails({ planId, plan, onClose }: WorkoutPlanDetailsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{plan.name}</DialogTitle>
              <DialogDescription>{plan.description}</DialogDescription>
            </div>
            <Badge
              variant={
                plan.level === "Beginner" ? "outline" : plan.level === "Intermediate" ? "secondary" : "destructive"
              }
            >
              {plan.level}
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex flex-wrap gap-4 my-4">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{plan.duration}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{plan.frequency}</span>
          </div>
          <div className="flex items-center">
            <Dumbbell className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{plan.workouts.filter((w) => w.exercises.length > 0).length} workouts per week</span>
          </div>
        </div>

        <Tabs defaultValue="1">
          <TabsList className="grid grid-cols-7 mb-4">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <TabsTrigger key={day} value={day.toString()}>
                Day {day}
              </TabsTrigger>
            ))}
          </TabsList>

          {plan.workouts.map((workout) => (
            <TabsContent key={workout.day} value={workout.day.toString()}>
              <Card>
                <CardHeader>
                  <CardTitle>{workout.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {workout.exercises.length > 0 ? (
                    <div className="space-y-4">
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">{exercise.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {exercise.sets > 0 ? `${exercise.sets} sets × ${exercise.reps}` : exercise.reps}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Dumbbell className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-24 items-center justify-center">
                      <p className="text-muted-foreground">Rest day</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button
            onClick={() => {
              alert(`Plan ${planId} started! In a real app, this would be saved to your profile.`)
              onClose()
            }}
          >
            Start This Plan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
