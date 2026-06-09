"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { time: "00:00", "2xx": 12500, "4xx": 180, "5xx": 12 },
  { time: "04:00", "2xx": 8200, "4xx": 95, "5xx": 5 },
  { time: "08:00", "2xx": 28500, "4xx": 420, "5xx": 28 },
  { time: "12:00", "2xx": 42000, "4xx": 580, "5xx": 45 },
  { time: "16:00", "2xx": 38500, "4xx": 490, "5xx": 32 },
  { time: "20:00", "2xx": 24800, "4xx": 320, "5xx": 18 },
]

export function RequestChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground">HTTP Requests</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Response status distribution</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
            <span className="text-xs text-muted-foreground">2xx</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-[oklch(0.75_0.15_80)]" />
            <span className="text-xs text-muted-foreground">4xx</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-destructive" />
            <span className="text-xs text-muted-foreground">5xx</span>
          </div>
        </div>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
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
              tickFormatter={(value) => `${value / 1000}k`}
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
              cursor={{ fill: "oklch(0.25 0 0)" }}
            />
            <Bar
              dataKey="2xx"
              fill="oklch(0.7 0.15 175)"
              radius={[4, 4, 0, 0]}
              stackId="stack"
            />
            <Bar
              dataKey="4xx"
              fill="oklch(0.75 0.15 80)"
              radius={[0, 0, 0, 0]}
              stackId="stack"
            />
            <Bar
              dataKey="5xx"
              fill="oklch(0.6 0.2 25)"
              radius={[4, 4, 0, 0]}
              stackId="stack"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
