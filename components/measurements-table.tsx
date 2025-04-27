"use client"

import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Database } from "@/lib/database.types"

type BodyMeasurement = Database["public"]["Tables"]["body_measurements"]["Row"]

interface MeasurementsTableProps {
  measurements: BodyMeasurement[]
  isLoading: boolean
}

export default function MeasurementsTable({ measurements, isLoading }: MeasurementsTableProps) {
  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  if (measurements.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center border rounded">
        <p className="text-muted-foreground">No measurements recorded yet</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Weight (kg)</TableHead>
            <TableHead>Body Fat (%)</TableHead>
            <TableHead className="hidden md:table-cell">Chest (cm)</TableHead>
            <TableHead className="hidden md:table-cell">Waist (cm)</TableHead>
            <TableHead className="hidden md:table-cell">Hips (cm)</TableHead>
            <TableHead className="hidden lg:table-cell">Arms (cm)</TableHead>
            <TableHead className="hidden lg:table-cell">Thighs (cm)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {measurements.map((measurement) => (
            <TableRow key={measurement.id}>
              <TableCell>{format(new Date(measurement.date), "MMM d, yyyy")}</TableCell>
              <TableCell>{measurement.weight}</TableCell>
              <TableCell>{measurement.body_fat_percentage}</TableCell>
              <TableCell className="hidden md:table-cell">{measurement.chest}</TableCell>
              <TableCell className="hidden md:table-cell">{measurement.waist}</TableCell>
              <TableCell className="hidden md:table-cell">{measurement.hips}</TableCell>
              <TableCell className="hidden lg:table-cell">{measurement.arms}</TableCell>
              <TableCell className="hidden lg:table-cell">{measurement.thighs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
