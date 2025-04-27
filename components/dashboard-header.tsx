"use client"

import Link from "next/link"
import { Activity } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardHeader() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FitTrack</span>
          </Link>
        </div>
        <UserNav user={user} />
      </div>
    </header>
  )
}
