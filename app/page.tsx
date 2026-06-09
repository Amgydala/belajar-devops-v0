import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { CpuChart } from "@/components/dashboard/cpu-chart"
import { NetworkChart } from "@/components/dashboard/network-chart"
import { ServerTable } from "@/components/dashboard/server-table"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { RequestChart } from "@/components/dashboard/request-chart"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="pl-64">
        <Header />

        <main className="space-y-6 p-6">
          {/* Stats Cards */}
          <StatsCards />

          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            <CpuChart />
            <NetworkChart />
          </div>

          {/* Server Table and Activity */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ServerTable />
            </div>
            <div>
              <ActivityFeed />
            </div>
          </div>

          {/* Request Chart */}
          <RequestChart />
        </main>
      </div>
    </div>
  )
}