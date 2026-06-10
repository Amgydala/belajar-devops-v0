"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function CpuChart() {
  // State untuk menyimpan list data grafik riil
  const [data, setData] = useState<{ time: string; usage: number }[]>([
    { time: "Start", usage: 0 }
  ])

  useEffect(() => {
    // Fungsi untuk mengambil data asli dari laptop via API internal
    const fetchRealData = async () => {
      try {
        const response = await fetch('/api/stats')
        const resData = await response.json()

        if (resData.cpu !== undefined) {
          setData((prevData) => {
            // Ambil 6 data terakhir saja agar grafik tidak kepanjangan
            const newData = [...prevData, { time: resData.time, usage: resData.cpu }]
            if (newData.length > 7) newData.shift()
            return newData
          })
        }
      } catch (err) {
        console.error("Gagal menyadap data laptop:", err)
      }
    }

    // Ambil data pertama kali, lalu ulangi setiap 2 detik secara real-time
    fetchRealData()
    const interval = setInterval(fetchRealData, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold tracking-tight">Live Laptop CPU Load</h3>
        <p className="text-sm text-muted-foreground">Menggunakan data asli hardware kamu</p>
      </div>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="time" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
            <Tooltip contentStyle={{ background: '#1f2937', borderColor: '#374151', color: '#fff' }} />
            <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} /> {/* Warna biru tanda data riil */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}