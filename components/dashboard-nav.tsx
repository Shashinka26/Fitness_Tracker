"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart2, Calendar, Dumbbell, Home, Ruler, Settings, Target, Trophy, BookOpen, Utensils } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Workouts",
    href: "/workouts",
    icon: Dumbbell,
  },
  {
    title: "Exercise Library",
    href: "/exercises",
    icon: BookOpen,
  },
  {
    title: "Workout Plans",
    href: "/plans",
    icon: Calendar,
  },
  {
    title: "Nutrition",
    href: "/nutrition",
    icon: Utensils,
  },
  {
    title: "Measurements",
    href: "/measurements",
    icon: Ruler,
  },
  {
    title: "Progress",
    href: "/progress",
    icon: BarChart2,
  },
  {
    title: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    title: "Achievements",
    href: "/achievements",
    icon: Trophy,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2 p-4">
        <nav className="grid gap-1 px-2 py-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
