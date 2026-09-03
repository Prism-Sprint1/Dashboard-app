"use client"

import { MoveDown, MoveUp, MoveDiagonal } from "lucide-react"
import { Area, AreaChart as RechartsAreaChart } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { AreaChartData } from "./types"

export function AreaChart({
  id,
  title,
  icon: Icon,
  iconBg,
  iconColor,
  value,
  unit,
  changeRate,
  points,
}: AreaChartData) {
  const isUp = changeRate >= 0
  const TrendIcon = isUp ? MoveUp : MoveDown
  const trendColor = isUp ? "text-green-500" : "text-red-500"
  const trendBg = isUp ? "bg-green-500/15" : "bg-red-500/15"

  const chartConfig = {
    value: {
      label: title,
      color: isUp ? "#10b981" : "#f43f5e",
    },
  } satisfies ChartConfig

  const gradientId = `fill-${id}`

  return (
    <Card>
      <CardContent>
        <MoveDiagonal className="ml-auto size-4 text-muted-foreground" />
        <div className="flex items-center gap-2">
          <span
            className={`flex size-8 items-center justify-center rounded-full ${iconBg}`}
          >
            <Icon className={`size-4 ${iconColor}`} />
          </span>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>

        <div className="mt-3 flex items-end gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold">{value}</span>
              <span className="text-xs text-muted-foreground">{unit}</span>
            </div>

            <div
              className={`mt-3 flex items-center gap-2 text-sm ${trendColor}`}
            >
              <span
                className={`flex size-7 items-center justify-center rounded-full ${trendBg}`}
              >
                <TrendIcon className="size-3.5" />
              </span>
              <span>{Math.abs(changeRate)}%</span>
            </div>
          </div>

          <ChartContainer
            config={chartConfig}
            className="h-20 w-[45%] shrink-0"
          >
            <RechartsAreaChart
              data={points}
              margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-value)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="value"
                type="monotone"
                stroke="var(--color-value)"
                strokeWidth={2}
                fill={`url(#${gradientId})`}
              />
            </RechartsAreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
