import { type NextRequest, NextResponse } from "next/server"
import { saveSubmission } from "@/lib/database"

interface RequestBody {
  age: number
  goal: string
  userId?: string
}

const VALID_GOALS = ["Energy", "Sleep", "Focus"] as const
type ValidGoal = (typeof VALID_GOALS)[number]

const SUGGESTIONS: Record<ValidGoal, { general: string[]; ageSpecific: Record<string, string[]> }> = {
  Energy: {
    general: [
      "Stay hydrated by drinking 8-10 glasses of water daily",
      "Include protein in every meal to maintain steady energy levels",
      "Take short 10-15 minute walks throughout the day",
      "Limit processed foods and sugar to avoid energy crashes",
    ],
    ageSpecific: {
      young: ["Consider high-intensity interval training (HIIT) workouts", "Focus on building healthy habits early"],
      middle: ["Incorporate strength training 2-3 times per week", "Consider vitamin D supplementation"],
      senior: ["Prioritize gentle exercises like swimming or yoga", "Ensure adequate B12 intake"],
    },
  },
  Sleep: {
    general: [
      "Maintain a consistent sleep schedule, even on weekends",
      "Create a relaxing bedtime routine 1 hour before sleep",
      "Keep your bedroom cool, dark, and quiet",
      "Avoid caffeine 6 hours before bedtime",
    ],
    ageSpecific: {
      young: ["Limit screen time 2 hours before bed", "Aim for 8-9 hours of sleep nightly"],
      middle: ["Consider meditation or deep breathing exercises", "Avoid large meals close to bedtime"],
      senior: [
        "Take short daytime naps if needed (20-30 minutes)",
        "Discuss sleep concerns with your healthcare provider",
      ],
    },
  },
  Focus: {
    general: [
      "Practice the Pomodoro Technique: 25 minutes focused work, 5 minute breaks",
      "Minimize distractions by organizing your workspace",
      "Include omega-3 rich foods like fish, walnuts, and flaxseeds",
      "Practice mindfulness or meditation for 10 minutes daily",
    ],
    ageSpecific: {
      young: ["Try brain training apps and puzzles", "Establish consistent study/work routines"],
      middle: ["Consider learning new skills to keep your mind sharp", "Manage stress through regular exercise"],
      senior: ["Engage in social activities and conversations", "Consider crossword puzzles and reading"],
    },
  },
}

function getAgeCategory(age: number): string {
  if (age < 30) return "young"
  if (age < 60) return "middle"
  return "senior"
}

function validateRequest(body: any): { isValid: boolean; error?: string; data?: RequestBody } {
  if (!body || typeof body !== "object") {
    return { isValid: false, error: "Invalid request body" }
  }

  const { age, goal, userId } = body

  if (age === undefined || age === null) {
    return { isValid: false, error: "Age is required" }
  }

  if (typeof age !== "number" || isNaN(age)) {
    return { isValid: false, error: "Age must be a valid number" }
  }

  if (age <= 0 || age > 150) {
    return { isValid: false, error: "Age must be between 1 and 150" }
  }

  if (!goal || typeof goal !== "string") {
    return { isValid: false, error: "Health goal is required" }
  }

  if (!VALID_GOALS.includes(goal as ValidGoal)) {
    return { isValid: false, error: `Goal must be one of: ${VALID_GOALS.join(", ")}` }
  }

  return { isValid: true, data: { age, goal: goal as ValidGoal, userId } }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = validateRequest(body)

    if (!validation.isValid) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
    }

    const { age, goal, userId } = validation.data!

    // Use hardcoded suggestions
    const ageCategory = getAgeCategory(age)
    const goalSuggestions = SUGGESTIONS[goal as ValidGoal]
    const suggestions = [
      `Based on your age (${age}) and goal to improve ${goal.toLowerCase()}, here are our recommendations:`,
      ...goalSuggestions.general,
      ...goalSuggestions.ageSpecific[ageCategory],
    ]

    // Save to database
    saveSubmission({
      userId: userId || "anonymous",
      age,
      goal,
      suggestions,
    })

    return NextResponse.json({
      success: true,
      suggestions,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again later." },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ success: false, error: "Method not allowed. Use POST." }, { status: 405 })
}
