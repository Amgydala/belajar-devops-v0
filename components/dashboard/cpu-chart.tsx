"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { time: "00:00", cpu: 45, memory: 62 },
  { time: "02:00", cpu: 38, memory: 58 },
  { time: "04:00", cpu: 32, memory: 55 },
  { time: "06:00", cpu: 48, memory: 60 },
  { time: "08:00", cpu: 72, memory: 78 },
  { time: "10:00", cpu: 85, memory: 82 },
  { time: "12:00", cpu: 78, memory: 75 },
  { time: "14:00", cpu: 82, memory: 80 },
  { time: "16:00", cpu: 75, memory: 72 },
  { time: "18:00", cpu: 68, memory: 68 },
  { time: "20:00", cpu: 55, memory: 65 },
  { time: "22:00", cpu: 42, memory: 60 },
]

export function CpuChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground">CPU & Memory Usage</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Last 24 hours</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">CPU</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">Memory</span>
          </div>
        </div>
      </div>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.7 0.15 175)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.7 0.15 175)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.65 0.2 250)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.65 0.2 250)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
              tickFormatter={(value) => `${value}%`}
              dx={-5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.18 0 0)",
                border: "1px solid oklch(0.25 0 0)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "oklch(0.95 0 0)" }}
              itemStyle={{ color: "oklch(0.8 0 0)" }}
            />
            <Area
              type="monotone"
              dataKey="cpu"
              stroke="oklch(0.7 0.15 175)"
              strokeWidth={2}
              fill="url(#cpuGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "oklch(0.7 0.15 175)", stroke: "oklch(0.1 0 0)", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="memory"
              stroke="oklch(0.65 0.2 250)"
              strokeWidth={2}
              fill="url(#memoryGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "oklch(0.65 0.2 250)", stroke: "oklch(0.1 0 0)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
