"use client"

import { Activity, Cpu, Database, HardDrive, Network, Server } from "lucide-react"

const stats = [
  {
    label: "Total Servers",
    value: "24",
    change: "+2 this month",
    changeType: "positive" as const,
    icon: Server,
    color: "primary",
  },
  {
    label: "Avg CPU Usage",
    value: "67%",
    change: "-5% from yesterday",
    changeType: "positive" as const,
    icon: Cpu,
    color: "accent",
  },
  {
    label: "Memory Used",
    value: "142 GB",
    change: "of 256 GB total",
    changeType: "neutral" as const,
    icon: Database,
    color: "chart-3",
  },
  {
    label: "Network Traffic",
    value: "1.2 TB",
    change: "+12% from yesterday",
    changeType: "negative" as const,
    icon: Network,
    color: "chart-5",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-${stat.color}/10`}>
              <stat.icon className={`h-4 w-4 text-${stat.color}`} />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p
              className={`mt-1 text-xs ${
                stat.changeType === "positive"
                  ? "text-[oklch(0.65_0.2_145)]"
                  : stat.changeType === "negative"
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
