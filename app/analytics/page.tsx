"use client"

import { useState, useEffect } from "react"

interface Analytics {
  goalCounts: {
    Energy: number
    Sleep: number
    Focus: number
  }
  totalSubmissions: number
}

interface Submission {
  id: string
  userId: string
  age: number
  goal: string
  timestamp: string
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [recentSubmissions, setRecentSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get_analytics" }),
      })

      const data = await response.json()
      if (data.success) {
        setAnalytics(data.analytics)
        setRecentSubmissions(data.recentSubmissions || [])
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="container">
        <div className="error-container">
          <p>Failed to load analytics data</p>
          <button onClick={fetchAnalytics} className="button button-primary">
            Retry
          </button>
        </div>
      </div>
    )
  }

  const totalGoals = Object.values(analytics.goalCounts).reduce((sum, count) => sum + count, 0)

  return (
    <div className="container">
      <header className="header">
        <h1>Analytics Dashboard</h1>
        <p>Usage statistics and insights</p>
      </header>

      <main className="analytics-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Submissions</h3>
            <div className="stat-number">{analytics.totalSubmissions}</div>
          </div>

          <div className="stat-card">
            <h3>Most Popular Goal</h3>
            <div className="stat-number">
              {totalGoals > 0
                ? Object.entries(analytics.goalCounts).reduce((a, b) =>
                    analytics.goalCounts[a[0] as keyof typeof analytics.goalCounts] >
                    analytics.goalCounts[b[0] as keyof typeof analytics.goalCounts]
                      ? a
                      : b,
                  )[0]
                : "None"}
            </div>
          </div>

          <div className="stat-card">
            <h3>Average Age</h3>
            <div className="stat-number">
              {recentSubmissions.length > 0
                ? Math.round(recentSubmissions.reduce((sum, sub) => sum + sub.age, 0) / recentSubmissions.length)
                : "N/A"}
            </div>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-container">
            <h3>Goal Distribution</h3>
            <div className="goal-bars">
              {Object.entries(analytics.goalCounts).map(([goal, count]) => (
                <div key={goal} className="goal-bar">
                  <div className="goal-label">{goal}</div>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{
                        width: totalGoals > 0 ? `${(count / totalGoals) * 100}%` : "0%",
                      }}
                    ></div>
                  </div>
                  <div className="goal-count">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="recent-submissions">
          <h3>Recent Submissions</h3>
          {recentSubmissions.length > 0 ? (
            <div className="submissions-table">
              <div className="table-header">
                <div>User</div>
                <div>Age</div>
                <div>Goal</div>
                <div>Date</div>
              </div>
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="table-row">
                  <div>{submission.userId}</div>
                  <div>{submission.age}</div>
                  <div>{submission.goal}</div>
                  <div>{new Date(submission.timestamp).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          ) : (
            <p>No submissions yet</p>
          )}
        </div>

        <div className="actions">
          <button onClick={fetchAnalytics} className="button button-primary">
            Refresh Data
          </button>
          <a href="/" className="button button-secondary">
            Back to App
          </a>
        </div>
      </main>
    </div>
  )
}
