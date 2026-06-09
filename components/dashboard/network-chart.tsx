"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { time: "00:00", incoming: 120, outgoing: 85 },
  { time: "02:00", incoming: 95, outgoing: 72 },
  { time: "04:00", incoming: 80, outgoing: 65 },
  { time: "06:00", incoming: 150, outgoing: 110 },
  { time: "08:00", incoming: 320, outgoing: 280 },
  { time: "10:00", incoming: 450, outgoing: 380 },
  { time: "12:00", incoming: 380, outgoing: 320 },
  { time: "14:00", incoming: 420, outgoing: 350 },
  { time: "16:00", incoming: 350, outgoing: 290 },
  { time: "18:00", incoming: 280, outgoing: 230 },
  { time: "20:00", incoming: 200, outgoing: 160 },
  { time: "22:00", incoming: 150, outgoing: 110 },
]

export function NetworkChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground">Network Traffic</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Data transfer in MB/s</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.2_145)]" />
            <span className="text-xs text-muted-foreground">Incoming</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.75_0.15_80)]" />
            <span className="text-xs text-muted-foreground">Outgoing</span>
          </div>
        </div>
      </div>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="incomingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.65 0.2 145)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.65 0.2 145)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="outgoingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.75 0.15 80)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.75 0.15 80)" stopOpacity={0} />
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
              tickFormatter={(value) => `${value}`}
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
              formatter={(value: number) => [`${value} MB/s`]}
            />
            <Area
              type="monotone"
              dataKey="incoming"
              stroke="oklch(0.65 0.2 145)"
              strokeWidth={2}
              fill="url(#incomingGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "oklch(0.65 0.2 145)", stroke: "oklch(0.1 0 0)", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="outgoing"
              stroke="oklch(0.75 0.15 80)"
              strokeWidth={2}
              fill="url(#outgoingGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "oklch(0.75 0.15 80)", stroke: "oklch(0.1 0 0)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
