"use client"

import { useRef } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 2400,
    previous: 1800,
  },
  {
    name: "Feb",
    total: 1398,
    previous: 1210,
  },
  {
    name: "Mar",
    total: 9800,
    previous: 6800,
  },
  {
    name: "Apr",
    total: 3908,
    previous: 2900,
  },
  {
    name: "May",
    total: 4800,
    previous: 3800,
  },
  {
    name: "Jun",
    total: 3800,
    previous: 2800,
  },
  {
    name: "Jul",
    total: 4300,
    previous: 2300,
  },
  {
    name: "Aug",
    total: 5300,
    previous: 4100,
  },
  {
    name: "Sep",
    total: 4900,
    previous: 3900,
  },
  {
    name: "Oct",
    total: 6300,
    previous: 4300,
  },
  {
    name: "Nov",
    total: 5400,
    previous: 4200,
  },
  {
    name: "Dec",
    total: 7800,
    previous: 5800,
  },
]

export function SalesSummaryChart() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Current</span>
                        <span className="font-bold text-primary">${payload[0].value}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Previous</span>
                        <span className="font-bold text-primary">${payload[1].value}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#0ea5e9"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "#0ea5e9", opacity: 0.25 },
            }}
          />
          <Line
            type="monotone"
            dataKey="previous"
            stroke="#9ca3af"
            strokeWidth={2}
            strokeDasharray="4 4"
            activeDot={{
              r: 6,
              style: { fill: "#9ca3af", opacity: 0.25 },
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

