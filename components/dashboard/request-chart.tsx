"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

export function RequestChart() {
  // State untuk menyimpan riwayat traffic internet (Download & Upload)
  const [data, setData] = useState<{ time: string; download: number; upload: number }[]>([
    { time: "Start", download: 0, upload: 0 }
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
              download: resData.download, 
              upload: resData.upload 
            }]
            // Batasi hanya 10 data terakhir di grafik
            if (newData.length > 10) newData.shift()
            return newData
          })
        }
      } catch (err) {
        console.error("Gagal menyadap network laptop:", err)
      }
    }

    fetchNetworkData()
    const interval = setInterval(fetchNetworkData, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold tracking-tight">Real-Time Network Traffic</h3>
        <p className="text-sm text-muted-foreground">Kecepatan internet laptopmu saat ini (MB/s)</p>
      </div>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="time" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} MB/s`} />
            <Tooltip contentStyle={{ background: '#1f2937', borderColor: '#374151', color: '#fff' }} />
            <Legend />
            {/* Grafik Area untuk Download (Warna Ungu) */}
            <Area type="monotone" dataKey="download" name="Download (In)" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} />
            {/* Grafik Area untuk Upload (Warna Oranye) */}
            <Area type="monotone" dataKey="upload" name="Upload (Out)" stroke="#f97316" fill="#f97316" fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}