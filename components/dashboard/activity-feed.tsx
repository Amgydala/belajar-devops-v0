"use client"

import {
  AlertTriangle,
  CheckCircle,
  Cloud,
  GitBranch,
  RefreshCw,
  Server,
  Shield,
  XCircle,
} from "lucide-react"

const activities = [
  {
    id: 1,
    type: "deployment",
    message: "Deployed v2.4.1 to production",
    time: "2 min ago",
    icon: GitBranch,
    color: "text-[oklch(0.65_0.2_145)]",
    bgColor: "bg-[oklch(0.65_0.2_145/0.1)]",
  },
  {
    id: 2,
    type: "alert",
    message: "High CPU usage on dev-worker-01",
    time: "15 min ago",
    icon: AlertTriangle,
    color: "text-[oklch(0.75_0.15_80)]",
    bgColor: "bg-[oklch(0.75_0.15_80/0.1)]",
  },
  {
    id: 3,
    type: "server",
    message: "Server cache-redis-01 restarted",
    time: "32 min ago",
    icon: RefreshCw,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: 4,
    type: "security",
    message: "SSL certificate renewed for api.domain.com",
    time: "1 hour ago",
    icon: Shield,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 5,
    type: "success",
    message: "Database backup completed successfully",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-[oklch(0.65_0.2_145)]",
    bgColor: "bg-[oklch(0.65_0.2_145/0.1)]",
  },
  {
    id: 6,
    type: "cloud",
    message: "Auto-scaling triggered for prod-api cluster",
    time: "3 hours ago",
    icon: Cloud,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
]

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-medium text-foreground">Recent Activity</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">Latest events and alerts</p>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-muted/30"
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${activity.bgColor}`}>
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1 space-y-0.5">
              <p className="text-sm text-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-3">
        <button className="w-full rounded-lg py-2 text-center text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          View All Activity
        </button>
      </div>
    </div>
  )
}
