"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

// Ganti nama fungsinya di bawah ini jika di page.tsx nama panggilannya berbeda
export function NetworkChart() {
  // State untuk menyimpan riwayat traffic internet asli laptop
  const [data, setData] = useState<{ time: string; incoming: number; outgoing: number }[]>([
    { time: "Start", incoming: 0, outgoing: 0 }
  ])

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const response = await fetch('/api/stats')
        const resData = await response.json()

        if (resData.download !== undefined && resData.upload !== undefined) {
          setData((prevData) => {
            const newData = [...prevData, { 
              time: resData.time, 
              incoming: resData.download, // data asli download dari laptop
              outgoing: resData.upload    // data asli upload dari laptop
            }]
            // Batasi hanya 8 data terakhir di layar agar tidak penuh
            if (newData.length > 8) newData.shift()
            return newData
          })
        }
      } catch (err) {
        console.error("Gagal menyadap network laptop:", err)
      }
    }

    fetchNetworkData()
    const interval = setInterval(fetchNetworkData, 2000) // Ambil data setiap 2 detik

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold tracking-tight">Network Traffic</h3>
        <p className="text-sm text-muted-foreground">Data transfer in MB/s</p>
      </div>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="time" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} MB/s`} />
            <Tooltip contentStyle={{ background: '#1f2937', borderColor: '#374151', color: '#fff' }} />
            <Legend />
            {/* Incoming / Download - Warna Hijau */}
            <Area type="monotone" dataKey="incoming" name="Incoming" stroke="#10b981" fill="#10b981" fillOpacity={0.15} />
            {/* Outgoing / Upload - Warna Kuning/Oranye */}
            <Area type="monotone" dataKey="outgoing" name="Outgoing" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.05} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}