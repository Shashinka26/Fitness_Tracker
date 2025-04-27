"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Database } from "@/lib/database.types"

type BodyMeasurement = Database["public"]["Tables"]["body_measurements"]["Row"]
type NewMeasurement = Omit<BodyMeasurement, "id" | "user_id" | "created_at">

interface AddMeasurementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (measurement: NewMeasurement) => void
}

export default function AddMeasurementDialog({ open, onOpenChange, onSubmit }: AddMeasurementDialogProps) {
  const [measurement, setMeasurement] = useState<NewMeasurement>({
    date: new Date().toISOString().split("T")[0],
    weight: null,
    body_fat_percentage: null,
    chest: null,
    waist: null,
    hips: null,
    arms: null,
    thighs: null,
    notes: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "date") {
      setMeasurement({ ...measurement, [name]: value })
    } else if (value === "") {
      setMeasurement({ ...measurement, [name]: null })
    } else {
      setMeasurement({ ...measurement, [name]: Number.parseFloat(value) })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(measurement)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Measurement</DialogTitle>
            <DialogDescription>Record your body measurements to track your progress over time.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={measurement.date}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.1"
                placeholder="e.g., 70.5"
                value={measurement.weight || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="body_fat_percentage" className="text-right">
                Body Fat (%)
              </Label>
              <Input
                id="body_fat_percentage"
                name="body_fat_percentage"
                type="number"
                step="0.1"
                placeholder="e.g., 15.5"
                value={measurement.body_fat_percentage || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="chest" className="text-right">
                Chest (cm)
              </Label>
              <Input
                id="chest"
                name="chest"
                type="number"
                step="0.1"
                placeholder="e.g., 95.0"
                value={measurement.chest || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="waist" className="text-right">
                Waist (cm)
              </Label>
              <Input
                id="waist"
                name="waist"
                type="number"
                step="0.1"
                placeholder="e.g., 80.0"
                value={measurement.waist || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hips" className="text-right">
                Hips (cm)
              </Label>
              <Input
                id="hips"
                name="hips"
                type="number"
                step="0.1"
                placeholder="e.g., 90.0"
                value={measurement.hips || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="arms" className="text-right">
                Arms (cm)
              </Label>
              <Input
                id="arms"
                name="arms"
                type="number"
                step="0.1"
                placeholder="e.g., 35.0"
                value={measurement.arms || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="thighs" className="text-right">
                Thighs (cm)
              </Label>
              <Input
                id="thighs"
                name="thighs"
                type="number"
                step="0.1"
                placeholder="e.g., 55.0"
                value={measurement.thighs || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Any additional notes"
                value={measurement.notes || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Measurement</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
