"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Plus, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import ProtectedRoute from "@/components/protected-route"
import type { Database } from "@/lib/database.types"

type WorkoutType = Database["public"]["Tables"]["workout_types"]["Row"]
type Exercise = Database["public"]["Tables"]["exercises"]["Row"]

type ExerciseWithSets = {
  id: string
  exerciseId: string
  name: string
  sets: {
    id: string
    reps: string
    weight: string
  }[]
}

export default function NewWorkout() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [workoutName, setWorkoutName] = useState("")
  const [workoutType, setWorkoutType] = useState("")
  const [notes, setNotes] = useState("")
  const [exercises, setExercises] = useState<ExerciseWithSets[]>([])
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([])
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch workout types
        const { data: types, error: typesError } = await supabase.from("workout_types").select("*").order("name")

        if (typesError) throw typesError
        setWorkoutTypes(types || [])

        // Fetch exercises
        const { data: exercises, error: exercisesError } = await supabase.from("exercises").select("*").order("name")

        if (exercisesError) throw exercisesError
        setAvailableExercises(exercises || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const addExercise = () => {
    const newExercise: ExerciseWithSets = {
      id: crypto.randomUUID(),
      exerciseId: "",
      name: "",
      sets: [
        {
          id: crypto.randomUUID(),
          reps: "",
          weight: "",
        },
      ],
    }
    setExercises([...exercises, newExercise])
  }

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter((exercise) => exercise.id !== exerciseId))
  }

  const updateExercise = (exerciseId: string, selectedExerciseId: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const selectedExercise = availableExercises.find((e) => e.id === selectedExerciseId)
          return {
            ...exercise,
            exerciseId: selectedExerciseId,
            name: selectedExercise?.name || "",
          }
        }
        return exercise
      }),
    )
  }

  const addSet = (exerciseId: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: [
              ...exercise.sets,
              {
                id: crypto.randomUUID(),
                reps: "",
                weight: "",
              },
            ],
          }
        }
        return exercise
      }),
    )
  }

  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.filter((set) => set.id !== setId),
          }
        }
        return exercise
      }),
    )
  }

  const updateSet = (exerciseId: string, setId: string, field: "reps" | "weight", value: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map((set) => {
              if (set.id === setId) {
                return { ...set, [field]: value }
              }
              return set
            }),
          }
        }
        return exercise
      }),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)

    try {
      // 1. Insert the workout
      const { data: workoutData, error: workoutError } = await supabase
        .from("workouts")
        .insert({
          user_id: user.id,
          name: workoutName,
          workout_type_id: workoutType || null,
          date: new Date().toISOString(),
          duration: 60, // Default duration
          notes,
        })
        .select()
        .single()

      if (workoutError) throw workoutError

      // 2. Insert workout exercises and sets
      for (const [index, exercise] of exercises.entries()) {
        if (!exercise.exerciseId) continue

        // Insert workout exercise
        const { data: workoutExerciseData, error: workoutExerciseError } = await supabase
          .from("workout_exercises")
          .insert({
            workout_id: workoutData.id,
            exercise_id: exercise.exerciseId,
            order_index: index,
          })
          .select()
          .single()

        if (workoutExerciseError) throw workoutExerciseError

        // Insert sets for this exercise
        const setsToInsert = exercise.sets.map((set, setIndex) => ({
          workout_exercise_id: workoutExerciseData.id,
          set_number: setIndex + 1,
          reps: Number.parseInt(set.reps) || null,
          weight: Number.parseFloat(set.weight) || null,
        }))

        if (setsToInsert.length > 0) {
          const { error: setsError } = await supabase.from("sets").insert(setsToInsert)

          if (setsError) throw setsError
        }
      }

      router.push("/workouts")
    } catch (error) {
      console.error("Error creating workout:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="mb-6">
          <Link href="/workouts" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Workouts
          </Link>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">New Workout</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Workout Details</CardTitle>
              <CardDescription>Enter the details of your workout session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workout-name">Workout Name</Label>
                <Input
                  id="workout-name"
                  placeholder="e.g., Morning Strength Training"
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workout-type">Workout Type</Label>
                <Select value={workoutType} onValueChange={setWorkoutType}>
                  <SelectTrigger id="workout-type">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    {workoutTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes about this workout"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exercises</CardTitle>
              <CardDescription>Add the exercises you performed during this workout</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {exercises.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <p className="mb-4 text-muted-foreground">No exercises added yet</p>
                  <Button type="button" variant="outline" onClick={addExercise}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Exercise
                  </Button>
                </div>
              ) : (
                exercises.map((exercise) => (
                  <div key={exercise.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-2 flex-1 mr-4">
                        <Label htmlFor={`exercise-${exercise.id}`}>Exercise</Label>
                        <Select
                          value={exercise.exerciseId}
                          onValueChange={(value) => updateExercise(exercise.id, value)}
                        >
                          <SelectTrigger id={`exercise-${exercise.id}`}>
                            <SelectValue placeholder="Select an exercise" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableExercises.map((ex) => (
                              <SelectItem key={ex.id} value={ex.id}>
                                {ex.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExercise(exercise.id)}
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <Label>Sets</Label>
                        <Button type="button" variant="outline" size="sm" onClick={() => addSet(exercise.id)}>
                          <Plus className="mr-1 h-3 w-3" />
                          Add Set
                        </Button>
                      </div>

                      {exercise.sets.length > 0 ? (
                        <div className="space-y-2">
                          <div className="grid grid-cols-12 gap-2 mb-1">
                            <div className="col-span-1 text-xs text-muted-foreground">#</div>
                            <div className="col-span-5 text-xs text-muted-foreground">Reps</div>
                            <div className="col-span-5 text-xs text-muted-foreground">Weight (kg)</div>
                            <div className="col-span-1"></div>
                          </div>
                          {exercise.sets.map((set, setIndex) => (
                            <div key={set.id} className="grid grid-cols-12 gap-2 items-center">
                              <div className="col-span-1 text-sm font-medium">{setIndex + 1}</div>
                              <div className="col-span-5">
                                <Input
                                  type="number"
                                  min="0"
                                  placeholder="Reps"
                                  value={set.reps}
                                  onChange={(e) => updateSet(exercise.id, set.id, "reps", e.target.value)}
                                />
                              </div>
                              <div className="col-span-5">
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.5"
                                  placeholder="Weight"
                                  value={set.weight}
                                  onChange={(e) => updateSet(exercise.id, set.id, "weight", e.target.value)}
                                />
                              </div>
                              <div className="col-span-1">
                                {exercise.sets.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeSet(exercise.id, set.id)}
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No sets added yet</p>
                      )}
                    </div>
                  </div>
                ))
              )}

              {exercises.length > 0 && (
                <Button type="button" variant="outline" onClick={addExercise} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Exercise
                </Button>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/workouts")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || exercises.length === 0 || !workoutName}>
                {isLoading ? "Saving..." : "Save Workout"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </ProtectedRoute>
  )
}
