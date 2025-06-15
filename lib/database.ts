// Simple in-memory database simulation
// In a real application, this would be replaced with a proper database

export interface Submission {
  id: string
  userId: string
  age: number
  goal: string
  suggestions: string[]
  timestamp: string
}

export interface Analytics {
  goalCounts: {
    Energy: number
    Sleep: number
    Focus: number
  }
  totalSubmissions: number
}

export interface Database {
  submissions: Submission[]
  analytics: Analytics
}

// Global database instance
let database: Database | null = null

export function getDatabase(): Database {
  if (!database) {
    database = {
      submissions: [],
      analytics: {
        goalCounts: {
          Energy: 0,
          Sleep: 0,
          Focus: 0,
        },
        totalSubmissions: 0,
      },
    }
  }
  return database
}

export function saveSubmission(data: {
  userId: string
  age: number
  goal: string
  suggestions: string[]
}): { success: boolean; id?: string; error?: string } {
  try {
    const db = getDatabase()
    const submission: Submission = {
      id: Date.now().toString(),
      userId: data.userId,
      age: data.age,
      goal: data.goal,
      suggestions: data.suggestions,
      timestamp: new Date().toISOString(),
    }

    db.submissions.push(submission)

    // Update analytics
    db.analytics.goalCounts[data.goal as keyof typeof db.analytics.goalCounts]++
    db.analytics.totalSubmissions++

    console.log("📊 Analytics Update:", {
      goal: data.goal,
      totalSubmissions: db.analytics.totalSubmissions,
      goalCounts: db.analytics.goalCounts,
    })

    return { success: true, id: submission.id }
  } catch (error) {
    console.error("Database save error:", error)
    return { success: false, error: "Failed to save to database" }
  }
}

export function getAnalytics(): { analytics: Analytics; recentSubmissions: Submission[] } {
  const db = getDatabase()
  return {
    analytics: db.analytics,
    recentSubmissions: db.submissions.slice(-10),
  }
}

export function getUserHistory(userId: string): Submission[] {
  const db = getDatabase()
  return db.submissions
    .filter((s) => s.userId === userId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}
