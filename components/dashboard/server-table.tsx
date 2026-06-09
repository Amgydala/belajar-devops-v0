"use client"

import { ChevronRight, MoreHorizontal } from "lucide-react"

const servers = [
  {
    id: "srv-001",
    name: "prod-api-01",
    type: "Production",
    status: "Running",
    cpu: 72,
    memory: 68,
    disk: 45,
    uptime: "45d 12h",
    location: "US-East",
  },
  {
    id: "srv-002",
    name: "prod-api-02",
    type: "Production",
    status: "Running",
    cpu: 65,
    memory: 72,
    disk: 52,
    uptime: "45d 12h",
    location: "US-East",
  },
  {
    id: "srv-003",
    name: "prod-db-master",
    type: "Database",
    status: "Running",
    cpu: 45,
    memory: 85,
    disk: 78,
    uptime: "30d 8h",
    location: "US-West",
  },
  {
    id: "srv-004",
    name: "staging-api-01",
    type: "Staging",
    status: "Running",
    cpu: 28,
    memory: 42,
    disk: 35,
    uptime: "12d 4h",
    location: "EU-Central",
  },
  {
    id: "srv-005",
    name: "dev-worker-01",
    type: "Development",
    status: "Warning",
    cpu: 92,
    memory: 88,
    disk: 82,
    uptime: "5d 16h",
    location: "US-East",
  },
  {
    id: "srv-006",
    name: "cache-redis-01",
    type: "Cache",
    status: "Running",
    cpu: 35,
    memory: 62,
    disk: 28,
    uptime: "60d 2h",
    location: "US-East",
  },
]

function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    Running: "bg-[oklch(0.65_0.2_145/0.15)] text-[oklch(0.65_0.2_145)]",
    Warning: "bg-[oklch(0.75_0.15_80/0.15)] text-[oklch(0.75_0.15_80)]",
    Stopped: "bg-destructive/15 text-destructive",
    Maintenance: "bg-accent/15 text-accent",
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        statusStyles[status as keyof typeof statusStyles] || statusStyles.Running
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

function UsageBar({ value, color }: { value: number; color: string }) {
  const colorClass =
    value > 80
      ? "bg-destructive"
      : value > 60
      ? "bg-[oklch(0.75_0.15_80)]"
      : color

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-muted-foreground">{value}%</span>
    </div>
  )
}

export function ServerTable() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="text-sm font-medium text-foreground">Server Status</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {servers.length} servers monitored
          </p>
        </div>
        <button className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80">
          View All
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Server
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                CPU
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Memory
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Disk
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Uptime
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Location
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {servers.map((server) => (
              <tr
                key={server.id}
                className="transition-colors hover:bg-muted/50"
              >
                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{server.name}</p>
                    <p className="text-xs text-muted-foreground">{server.type}</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={server.status} />
                </td>
                <td className="px-5 py-4">
                  <UsageBar value={server.cpu} color="bg-primary" />
                </td>
                <td className="px-5 py-4">
                  <UsageBar value={server.memory} color="bg-accent" />
                </td>
                <td className="px-5 py-4">
                  <UsageBar value={server.disk} color="bg-[oklch(0.65_0.2_145)]" />
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-muted-foreground">{server.uptime}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-muted-foreground">{server.location}</span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
