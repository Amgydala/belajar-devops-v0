"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function CpuChart() {
  // 1. State untuk menyimpan data grafik 6 jam terakhir
  const [data, setData] = useState([
    { time: "10:00", usage: 55 },
    { time: "11:00", usage: 62 },
    { time: "12:00", usage: 48 },
    { time: "13:00", usage: 70 },
    { time: "14:00", usage: 65 },
    { time: "15:00", usage: 67 }, // Ini data jam terakhir yang akan bergerak
  ])

  // 2. Timer otomatis untuk mengacak data jam terakhir setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        // Ambil semua data kecuali data terakhir
        const updatedData = [...prevData]
        // Acak angka khusus untuk jam terakhir (15:00) antara 45% - 85%
        updatedData[updatedData.length - 1] = {
          ...updatedData[updatedData.length - 1],
          usage: Math.floor(Math.random() * (85 - 45 + 1)) + 45
        }
        return updatedData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold tracking-tight">CPU Load History</h3>
        <p className="text-sm text-muted-foreground">Real-time hourly breakdown</p>
      </div>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="time" 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ background: '#1f2937', borderColor: '#374151', color: '#fff' }}
            />
            <Bar 
              dataKey="usage" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}