"use client"

import { useState } from "react"
import { Activity } from "lucide-react"
import { Label, Pie, PieChart as RechartsPieChart } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

const periods = ["1W", "1M", "3W", "YTD", "Total"] as const
type Period = (typeof periods)[number]

const activityKeys = [
  "packed",
  "processing",
  "done",
  "returned",
] as const
type ActivityKey = (typeof activityKeys)[number]

const activityByPeriod = {
  "1W": {
    packed: 24_000,
    processing: 21_500,
    done: 38_500,
    returned: 9_800,
  },
  "1M": {
    packed: 110_000,
    processing: 98_000,
    done: 140_000,
    returned: 67_236,
  },
  "3W": {
    packed: 84_000,
    processing: 73_500,
    done: 109_000,
    returned: 44_200,
  },
  YTD: {
    packed: 1_320_000,
    processing: 1_080_000,
    done: 1_740_000,
    returned: 488_400,
  },
  Total: {
    packed: 3_880_000,
    processing: 3_100_000,
    done: 4_970_000,
    returned: 1_328_400,
  },
} satisfies Record<Period, Record<ActivityKey, number>>

const chartConfig = {
  packed: {
    label: "To Be Packed",
    color: "#3aaee8",
  },
  processing: {
    label: "Process Delivery",
    color: "#f3b71b",
  },
  done: {
    label: "Delivery Done",
    color: "#2bb7a9",
  },
 ] returned: {
    label: "Returned",
    color: "#e73489",
  },
} satisfies ChartConfig

const tickData = Array.from({ length: 72 }, (_, index) => ({
  tick: `tick-${index}`,
  value: 1,
}))

const numberFormatter = new Intl.NumberFormat("en-US")

export default function PieChart() {
  const [period, setPeriod] = useState<Period>("1M")

  const chartData = activityKeys.map((status) => ({
    status,
    value: activityByPeriod[period][status],
    fill: `var(--color-${status})`,
  }))

  const total = chartData.reduce((sum, item) => sum + item.value, 0)
\
  return (
    <Card
      aria-labelledby="product-activity-title"
      className="dark w-full max-w-[1040px] gap-5 rounded-[22px] border border-[#2a2f2d] bg-[#101311] py-5 text-[#f5f6f5] shadow-none ring-0"
    >
      <CardHeader className="flex flex-col gap-5 px-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[#322b16] text-[#f4b51d]">
            <Activity aria-hidden="true" className="size-6" />
          </div>

          <CardTitle
            id="product-activity-title"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Product Activity
          </CardTitle>
        </div>

        <div className="-mx-1 overflow-x-auto px-1 pb-1">
          <ToggleGroup
            aria-label="Activity period"
            value={[period]}
            onValueChange={(value) => {
              const nextPeriod = value[0] as Period | undefined

              if (nextPeriod) {
                setPeriod(nextPeriod)
              }
            }}
            variant="outline"
            size="lg"
            spacing={2}
            className="min-w-max"
          >
            {periods.map((item) => (
              <ToggleGroupItem
                key={item}
                value={item}
                className="h-11 min-w-16 rounded-xl border-[#2b2f35] bg-transparent px-4 text-[#9b9da2] hover:bg-[#1b1e20] hover:text-white aria-pressed:border-[#252832] aria-pressed:bg-[#252832] aria-pressed:text-white"
              >
                {item}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </CardHeader>

      <CardContent className="grid items-center gap-7 px-5 pb-3 sm:px-7 md:grid-cols-[minmax(260px,390px)_minmax(0,1fr)] lg:gap-12">
        <div>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[390px]"
          >
            <RechartsPieChart accessibilityLayer>
              {/* 안쪽의 촘촘한 눈금 */}
              <Pie
                data={tickData}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                innerRadius="57%"
                outerRadius="60%"
                paddingAngle={3.4}
                fill="#303532"
                stroke="none"
                tooltipType="none"
                legendType="none"
                rootTabIndex={-1}
                isAnimationActive={false}
              />

              {/* 실제 데이터 원호 */}
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="status"
                startAngle={115}
                endAngle={-245}
                innerRadius="67%"
                outerRadius="84%"
                paddingAngle={5}
                cornerRadius={14}
                minAngle={2}
                stroke="none"
              >
                <Label
                  content={({ viewBox }) => {
                    if (
                      !viewBox ||
                      !("cx" in viewBox) ||
                      !("cy" in viewBox)
                    ) {
                      return null
                    }

                    const cx =
                      typeof viewBox.cx === "number" ? viewBox.cx : 0
                    const cy =
                      typeof viewBox.cy === "number" ? viewBox.cy : 0

                    return (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        aria-hidden="true"
                      >
                        <tspan
                          x={cx}
                          y={cy - 8}
                          className="fill-white text-[28px] font-semibold tracking-tight sm:text-[32px]"
                        >
                          {numberFormatter.format(total)}
                        </tspan>

                        <tspan
                          x={cx}
                          y={cy + 26}
                          className="fill-[#8e9390] text-[13px] sm:text-sm"
                        >
                          Total Activity
                        </tspan>
                      </text>
                    )
                  }}
                />
              </Pie>

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    nameKey="status"
                    className="border-white/10 bg-[#171a18]"
                  />
                }
              />
            </RechartsPieChart>
          </ChartContainer>

          <p className="sr-only" aria-live="polite">
            {period} total activity: {numberFormatter.format(total)}
          </p>
        </div>

        <ul aria-label="Activity breakdown" className="min-w-0">
          {chartData.map((item) => (
            <li
              key={item.status}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-dashed border-white/15 py-5 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="size-4 rounded-[4px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]"
                style={{
                  backgroundColor: chartConfig[item.status].color,
                }}
              />

              <span className="min-w-0 text-sm text-[#f1f2f1] sm:text-base">
                {chartConfig[item.status].label}
              </span>

              <span className="justify-self-end text-sm text-[#a2a6a3] tabular-nums sm:text-base">
                {numberFormatter.format(item.value)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
