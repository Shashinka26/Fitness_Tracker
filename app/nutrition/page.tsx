"use client"

import { useAuth } from "@/contexts/auth-context"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import ProtectedRoute from "@/components/protected-route"
import { nutritionData } from "@/lib/mock-data"

export default function NutritionPage() {
  const { user } = useAuth()

  // Calculate percentages for progress bars
  const caloriesConsumed = nutritionData.meals.reduce((total, meal) => total + meal.calories, 0)
  const caloriesPercentage = Math.min(100, (caloriesConsumed / nutritionData.dailyCalories) * 100)

  const proteinConsumed = nutritionData.meals.reduce(
    (total, meal) => total + meal.foods.reduce((mealTotal, food) => mealTotal + food.protein, 0),
    0,
  )
  const proteinPercentage = Math.min(100, (proteinConsumed / nutritionData.macros.protein) * 100)

  const carbsConsumed = nutritionData.meals.reduce(
    (total, meal) => total + meal.foods.reduce((mealTotal, food) => mealTotal + food.carbs, 0),
    0,
  )
  const carbsPercentage = Math.min(100, (carbsConsumed / nutritionData.macros.carbs) * 100)

  const fatConsumed = nutritionData.meals.reduce(
    (total, meal) => total + meal.foods.reduce((mealTotal, food) => mealTotal + food.fat, 0),
    0,
  )
  const fatPercentage = Math.min(100, (fatConsumed / nutritionData.macros.fat) * 100)

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardNav />
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Nutrition Tracker</h1>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Calories</CardTitle>
                    <CardDescription>
                      {caloriesConsumed} / {nutritionData.dailyCalories} kcal
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={caloriesPercentage} className="h-2" />
                    <p className="mt-2 text-xs text-muted-foreground">
                      {Math.round(nutritionData.dailyCalories - caloriesConsumed)} kcal remaining
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Protein</CardTitle>
                    <CardDescription>
                      {proteinConsumed}g / {nutritionData.macros.protein}g
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={proteinPercentage} className="h-2 bg-muted" indicatorClassName="bg-blue-500" />
                    <p className="mt-2 text-xs text-muted-foreground">
                      {Math.round(nutritionData.macros.protein - proteinConsumed)}g remaining
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Carbs</CardTitle>
                    <CardDescription>
                      {carbsConsumed}g / {nutritionData.macros.carbs}g
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={carbsPercentage} className="h-2 bg-muted" indicatorClassName="bg-green-500" />
                    <p className="mt-2 text-xs text-muted-foreground">
                      {Math.round(nutritionData.macros.carbs - carbsConsumed)}g remaining
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Fat</CardTitle>
                    <CardDescription>
                      {fatConsumed}g / {nutritionData.macros.fat}g
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={fatPercentage} className="h-2 bg-muted" indicatorClassName="bg-yellow-500" />
                    <p className="mt-2 text-xs text-muted-foreground">
                      {Math.round(nutritionData.macros.fat - fatConsumed)}g remaining
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="meals">
                <TabsList>
                  <TabsTrigger value="meals">Today's Meals</TabsTrigger>
                  <TabsTrigger value="log">Food Log</TabsTrigger>
                  <TabsTrigger value="plan">Meal Plan</TabsTrigger>
                </TabsList>

                <TabsContent value="meals" className="space-y-4 mt-6">
                  {nutritionData.meals.map((meal, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{meal.name}</CardTitle>
                        <CardDescription>{meal.calories} calories</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {meal.foods.map((food, foodIndex) => (
                            <div key={foodIndex} className="flex justify-between items-center border-b pb-2">
                              <div>
                                <p className="font-medium">{food.name}</p>
                                <p className="text-xs text-muted-foreground">{food.portion}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{food.calories} kcal</p>
                                <p className="text-xs text-muted-foreground">
                                  P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="log" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Food Log</CardTitle>
                      <CardDescription>Track what you eat throughout the day</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center border rounded">
                        <p className="text-muted-foreground">Food logging feature coming soon</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="plan" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Meal Planning</CardTitle>
                      <CardDescription>Plan your meals in advance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center border rounded">
                        <p className="text-muted-foreground">Meal planning feature coming soon</p>
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
