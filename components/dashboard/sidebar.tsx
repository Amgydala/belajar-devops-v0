"use client"

import {
  Activity,
  BarChart3,
  Bell,
  Box,
  Cloud,
  Database,
  GitBranch,
  Home,
  LayoutDashboard,
  Network,
  Server,
  Settings,
  Shield,
  Terminal,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, label: "Overview", href: "#", active: true },
  { icon: Server, label: "Servers", href: "#" },
  { icon: Activity, label: "Monitoring", href: "#" },
  { icon: Database, label: "Databases", href: "#" },
  { icon: Cloud, label: "Cloud Services", href: "#" },
  { icon: Network, label: "Network", href: "#" },
  { icon: GitBranch, label: "Deployments", href: "#" },
  { icon: Terminal, label: "Logs", href: "#" },
]

const bottomMenuItems = [
  { icon: Bell, label: "Alerts", href: "#" },
  { icon: Shield, label: "Security", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Box className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">DevOps</h1>
            <p className="text-xs text-muted-foreground">Infrastructure</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Main Menu
          </p>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.active && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom Menu */}
        <div className="border-t border-border px-3 py-4">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>

        {/* User */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-medium text-white">
              AD
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-foreground">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@devops.io</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
