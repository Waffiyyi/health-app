import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const MOCK_USERS = [
  {
    id: "1",
    email: "demo@example.com",
    password: "demo123",
    name: "Demo User",
  },
  {
    id: "2",
    email: "john@example.com",
    password: "password123",
    name: "John Doe",
  },
  {
    id: "3",
    email: "jane@example.com",
    password: "password123",
    name: "Jane Smith",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    // Find user in mock database
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
