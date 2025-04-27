"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Info } from "lucide-react"

interface Exercise {
  id: string
  name: string
  muscleGroup: string
  description: string
  difficulty: string
  equipment: string
  videoUrl?: string
}

interface ExerciseCardProps {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{exercise.name}</CardTitle>
              <CardDescription>{exercise.muscleGroup}</CardDescription>
            </div>
            <Badge
              variant={
                exercise.difficulty === "Beginner"
                  ? "outline"
                  : exercise.difficulty === "Intermediate"
                    ? "secondary"
                    : "destructive"
              }
            >
              {exercise.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">{exercise.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <Dumbbell className="mr-1 h-3 w-3" />
            {exercise.equipment}
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowDetails(true)}>
            <Info className="mr-1 h-4 w-4" />
            Details
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{exercise.name}</DialogTitle>
            <DialogDescription>
              {exercise.muscleGroup} • {exercise.difficulty}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-md bg-muted aspect-video flex items-center justify-center">
              <Dumbbell className="h-12 w-12 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Exercise Demonstration</span>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm text-muted-foreground">{exercise.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Equipment Needed</h4>
              <p className="text-sm text-muted-foreground">{exercise.equipment}</p>
            </div>
            <div className="flex justify-between">
              <Badge
                variant={
                  exercise.difficulty === "Beginner"
                    ? "outline"
                    : exercise.difficulty === "Intermediate"
                      ? "secondary"
                      : "destructive"
                }
              >
                {exercise.difficulty}
              </Badge>
              <Button variant="outline" size="sm">
                Add to Workout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
