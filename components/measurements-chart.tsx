"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Database } from "@/lib/database.types"

type BodyMeasurement = Database["public"]["Tables"]["body_measurements"]["Row"]

interface MeasurementsChartProps {
  measurements: BodyMeasurement[]
  isLoading: boolean
}

export default function MeasurementsChart({ measurements, isLoading }: MeasurementsChartProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  if (isLoading) {
    return <div className="h-[300px] flex items-center justify-center">Loading measurements...</div>
  }

  if (measurements.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center border rounded">
        <p className="text-muted-foreground">No measurements recorded yet</p>
      </div>
    )
  }

  // Sort measurements by date (ascending)
  const sortedMeasurements = [...measurements].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Prepare data for charts
  const chartData = sortedMeasurements.map((measurement) => ({
    date: format(new Date(measurement.date), "MMM d"),
    weight: measurement.weight,
    bodyFat: measurement.body_fat_percentage,
    chest: measurement.chest,
    waist: measurement.waist,
    hips: measurement.hips,
    arms: measurement.arms,
    thighs: measurement.thighs,
  }))

  return (
    <Tabs defaultValue="weight" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="weight">Weight</TabsTrigger>
        <TabsTrigger value="bodyFat">Body Fat</TabsTrigger>
        <TabsTrigger value="measurements">Measurements</TabsTrigger>
      </TabsList>
      <TabsContent value="weight" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}kg`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="p-2 shadow-sm">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Weight</span>
                          <span className="font-bold">{payload[0].value}kg</span>
                        </div>
                      </div>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              strokeWidth={2}
              activeDot={{
                r: 6,
                style: { fill: "var(--primary)", opacity: 0.8 },
              }}
              style={{
                stroke: "var(--primary)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="bodyFat" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="p-2 shadow-sm">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Body Fat</span>
                          <span className="font-bold">{payload[0].value}%</span>
                        </div>
                      </div>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="bodyFat"
              strokeWidth={2}
              activeDot={{
                r: 6,
                style: { fill: "var(--primary)", opacity: 0.8 },
              }}
              style={{
                stroke: "var(--primary)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="measurements" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}cm`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        {payload.map((entry) => (
                          <div key={entry.dataKey} className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {entry.dataKey === "chest"
                                ? "Chest"
                                : entry.dataKey === "waist"
                                  ? "Waist"
                                  : entry.dataKey === "hips"
                                    ? "Hips"
                                    : entry.dataKey === "arms"
                                      ? "Arms"
                                      : "Thighs"}
                            </span>
                            <span className="font-bold" style={{ color: entry.color }}>
                              {entry.value}cm
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="chest"
              strokeWidth={2}
              activeDot={{
                r: 6,
                style: { fill: "var(--primary)", opacity: 0.8 },
              }}
              style={{
                stroke: "var(--primary)",
              }}
            />
            <Line
              type="monotone"
              dataKey="waist"
              strokeWidth={2}
              activeDot={{
                r: 6,
                style: { fill: "hsl(var(--primary) / 0.8)", opacity: 0.8 },
              }}
              style={{
                stroke: "hsl(var(--primary) / 0.8)",
              }}
            />
            <Line
              type="monotone"
              dataKey="hips"
              strokeWidth={2}
              activeDot={{
                r: 6,
                style: { fill: "hsl(var(--primary) / 0.6)", opacity: 0.8 },
              }}
              style={{
                stroke: "hsl(var(--primary) / 0.6)",
              }}
            />
            <Line
              type="monotone"
              dataKey="arms"
              strokeWidth={2}
              activeDot={{
                r: 6,
                style: { fill: "hsl(var(--primary) / 0.4)", opacity: 0.8 },
              }}
              style={{
                stroke: "hsl(var(--primary) / 0.4)",
              }}
            />
            <Line
              type="monotone"
              dataKey="thighs"
              strokeWidth={2}
              activeDot={{
                r: 6,
                style: { fill: "hsl(var(--primary) / 0.2)", opacity: 0.8 },
              }}
              style={{
                stroke: "hsl(var(--primary) / 0.2)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  )
}
