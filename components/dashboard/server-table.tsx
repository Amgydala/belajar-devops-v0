"use client"

import { useState, useEffect } from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"

interface LinuxProcess {
  pid: number
  name: string
  cpu: number
  mem: number
  state: string
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    Running: "bg-[oklch(0.65_0.2_145/0.15)] text-[oklch(0.65_0.2_145)]",
    Sleeping: "bg-[oklch(0.75_0.15_80/0.15)] text-[oklch(0.75_0.15_80)]",
    Stopped: "bg-destructive/15 text-destructive",
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        statusStyles[status as keyof typeof statusStyles] || statusStyles.Sleeping
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

function UsageBar({ value, color }: { value: number; color: string }) {
  const colorClass =
    value > 50
      ? "bg-destructive"
      : value > 20
      ? "bg-[oklch(0.75_0.15_80)]"
      : color

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      <span className="text-xs text-muted-foreground">{value}%</span>
    </div>
  )
}

export function ServerTable() {
  const [processes, setProcesses] = useState<LinuxProcess[]>([])

  useEffect(() => {
    const fetchWSLProcesses = async () => {
      try {
        const response = await fetch('/api/stats')
        const data = await response.json()
        if (data.processes) {
          setProcesses(data.processes)
        }
      } catch (err) {
        console.error("Gagal menyadap proses WSL Ubuntu:", err)
      }
    }

    fetchWSLProcesses()
    const interval = setInterval(fetchWSLProcesses, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="text-sm font-medium text-foreground">WSL Ubuntu Active Processes</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {processes.length} top active processes monitored
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
                PID
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                App Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                CPU Usage
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Memory Usage
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {processes.map((proc) => (
              <tr key={proc.pid} className="transition-colors hover:bg-muted/50">
                <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                  {proc.pid}
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-foreground">{proc.name}</p>
                  <p className="text-xs text-muted-foreground">Linux Process</p>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={proc.state} />
                </td>
                <td className="px-5 py-4">
                  <UsageBar value={proc.cpu} color="bg-primary" />
                </td>
                <td className="px-5 py-4">
                  <UsageBar value={proc.mem} color="bg-accent" />
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