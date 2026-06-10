"use client"

import { useState, useEffect } from "react"

export function StatsCards() {
  // State untuk menyimpan angka CPU dan RAM asli
  const [metrics, setMetrics] = useState({ cpu: 0, ram: 0 })

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/stats')
        const data = await response.json()
        
        if (data.cpu !== undefined && data.ram !== undefined) {
          setMetrics({ cpu: data.cpu, ram: data.ram })
        }
      } catch (err) {
        console.error("Gagal mengambil data untuk kotak stats:", err)
      }
    }

    // Ambil data pertama kali, lalu ulangi setiap 2 detik
    fetchMetrics()
    const interval = setInterval(fetchMetrics, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      {/* KOTAK CPU */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="text-sm font-medium text-muted-foreground">Avg CPU Usage</div>
        <div className="mt-2 text-3xl font-bold tracking-tight text-blue-500">
          {metrics.cpu}%
        </div>
        <div className="text-xs text-muted-foreground mt-1">Data asli prosesor laptop</div>
      </div>

      {/* KOTAK MEMORY / RAM */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="text-sm font-medium text-muted-foreground">Memory Used (RAM)</div>
        <div className="mt-2 text-3xl font-bold tracking-tight text-emerald-500">
          {metrics.ram}%
        </div>
        <div className="text-xs text-muted-foreground mt-1">Kapasitas RAM yang terpakai</div>
      </div>
    </div>
  )
}