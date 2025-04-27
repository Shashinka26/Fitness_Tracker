"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import MeasurementsChart from "@/components/measurements-chart"
import MeasurementsTable from "@/components/measurements-table"
import AddMeasurementDialog from "@/components/add-measurement-dialog"
import type { Database } from "@/lib/database.types"

type BodyMeasurement = Database["public"]["Tables"]["body_measurements"]["Row"]

export default function MeasurementsPage() {
  const { user } = useAuth()
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    async function fetchMeasurements() {
      if (!user) return

      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from("body_measurements")
          .select("*")
          .eq("user_id", user.id)
          .order("date", { ascending: false })

        if (error) throw error
        setMeasurements(data || [])
      } catch (error) {
        console.error("Error fetching measurements:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMeasurements()
  }, [user])

  const handleAddMeasurement = async (newMeasurement: Omit<BodyMeasurement, "id" | "user_id" | "created_at">) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("body_measurements")
        .insert({
          user_id: user.id,
          ...newMeasurement,
        })
        .select()
        .single()

      if (error) throw error

      setMeasurements([data, ...measurements])
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error adding measurement:", error)
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardNav />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Body Measurements</h1>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Measurement
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Measurement Progress</CardTitle>
                  <CardDescription>Track your body composition changes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <MeasurementsChart measurements={measurements} isLoading={isLoading} />
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Measurement History</CardTitle>
                  <CardDescription>Your recorded body measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <MeasurementsTable measurements={measurements} isLoading={isLoading} />
                </CardContent>
              </Card>
            </div>

            <AddMeasurementDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddMeasurement} />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
