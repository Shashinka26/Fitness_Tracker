import { cookies } from "next/headers"
import type { User } from "@/lib/types"

// Mock user data - in a real app, this would be stored in a database
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  },
]

export async function getUser(): Promise<User | null> {
  const userId = cookies().get("userId")?.value

  if (!userId) {
    return null
  }

  // Find user by ID
  const user = mockUsers.find((user) => user.id === userId)

  if (!user) {
    return null
  }

  return user
}
