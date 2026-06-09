"use client"

import { Bell, ChevronDown, RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-foreground">Overview</h1>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[oklch(0.65_0.2_145/0.15)] px-2.5 py-0.5 text-xs font-medium text-[oklch(0.65_0.2_145)]">
            All Systems Operational
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-lg border border-border bg-muted/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Time Range */}
        <Button variant="outline" className="h-9 gap-2 border-border bg-muted/50 text-sm">
          Last 12 hours
          <ChevronDown className="h-4 w-4" />
        </Button>

        {/* Refresh */}
        <Button variant="outline" size="icon" className="h-9 w-9 border-border bg-muted/50">
          <RefreshCw className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        <Button variant="outline" size="icon" className="relative h-9 w-9 border-border bg-muted/50">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
            3
          </span>
        </Button>
      </div>
    </header>
  )
}
