"use client";

import { useState, useEffect } from "react"
// Jika ada import ikon bawaan v0 di bagian atas (seperti Lucide icons), biarkan saja jangan dihapus.

export function StatsCards() {
  // 1. Tempat penyimpanan data simulasi (State)
  const [cpuUsage, setCpuUsage] = useState(67)
  const [memoryUsed, setMemoryUsed] = useState(142)
  const [networkTraffic, setNetworkTraffic] = useState(1.2)

  // 2. Timer otomatis untuk mengacak angka setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * (85 - 45 + 1)) + 45) // Acak 45% - 85%
      setMemoryUsed(Math.floor(Math.random() * (160 - 130 + 1)) + 130) // Acak 130GB - 160GB
      setNetworkTraffic(parseFloat((Math.random() * (2.0 - 0.8) + 0.8).toFixed(1))) // Acak 0.8TB - 2.0TB
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* KOTAK CPU */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="text-sm font-medium text-muted-foreground">Avg CPU Usage</div>
        <div className="mt-2 text-3xl font-bold tracking-tight text-emerald-500">
          {cpuUsage}%
        </div>
        <div className="text-xs text-muted-foreground mt-1">-5% from yesterday</div>
      </div>

      {/* KOTAK MEMORY */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="text-sm font-medium text-muted-foreground">Memory Used</div>
        <div className="mt-2 text-3xl font-bold tracking-tight">
          {memoryUsed} GB
        </div>
        <div className="text-xs text-muted-foreground mt-1">of 256 GB total</div>
      </div>

      {/* KOTAK NETWORK TRAFFIC */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="text-sm font-medium text-muted-foreground">Network Traffic</div>
        <div className="mt-2 text-3xl font-bold tracking-tight">
          {networkTraffic} TB
        </div>
        <div className="text-xs text-muted-foreground mt-1 text-emerald-500">+12% from yesterday</div>
      </div>

      {/* KOTAK TOTAL SERVERS (Statis) */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="text-sm font-medium text-muted-foreground">Total Servers</div>
        <div className="mt-2 text-3xl font-bold tracking-tight">24</div>
        <div className="text-xs text-muted-foreground mt-1 text-emerald-500">+2 this month</div>
      </div>
    </div>
  )
}