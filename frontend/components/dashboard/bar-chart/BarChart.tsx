"use client"
import * as React from "react"
import {
  Bar,
  BarChart as BarChartIcon,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  ReferenceDot,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"

// 시안 이미지 실제 데이터 매칭

import { data } from "@/lib/mockData"

const chartConfig = {
  paid: { label: "Paid product", color: "#2563eb" },
  checkout: { label: "Checkout Product", color: "#38bdf8" },
} satisfies ChartConfig

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length >= 2) {
    return (
      <div className="min-w-30 space-y-2 rounded-xl border border-gray-800 bg-[#0f1115] p-3 text-xs shadow-2xl">
        <p className="font-medium text-gray-400">Activity</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="h-2 w-1 rounded-sm bg-[#2563eb]" /> Paid
            </span>
            <span className="font-semibold text-white">{payload[0].value}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="h-2 w-1 rounded-sm bg-[#38bdf8]" /> Checkout
            </span>
            <span className="font-semibold text-white">{payload[1].value}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function BarChart() {
  // 상태 관리를 문자열(달의 이름) 기반으로 매칭하여 완벽 보장합니다
  const [activeMonth, setActiveMonth] = React.useState<string | null>(
    "Jul 2026"
  ) // 기본값 7월 고정
  const [activeHeight, setActiveHeight] = React.useState<number | null>(1300)

  return (
    //라운드 바깥라인
    <Card className="flex flex-3 rounded-xl border">
      <CardHeader className="flex min-h-0 w-full items-center justify-between gap-4 lg:col-span-8">
        <CardTitle className="flex-none">
          <div className="flex items-center">
            <div className="flex h-7 w-7 items-center justify-center gap-2 rounded-full bg-[#ea580c]/15 text-[#ea580c] select-none">
              <TrendingUp className="h-3.5 w-3.5" />
            </div>
            <span className="flex-full px-2 text-sm text-muted-foreground">
              Customert Activity
            </span>
          </div>
        </CardTitle>
        {/* cardheder의 우측 */}
        <div className="flex items-center justify-end text-[10px] font-medium text-gray-400">
          <div className="flex items-center space-x-1.5 px-3">
            <span className="h-2 w-2 rounded-sm bg-[#2563eb]" />
            <span>Paid product</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-sm bg-[#38bdf8]" />
            <span>Checkout Product</span>
          </div>
        </div>
      </CardHeader>
      {/* 그래프 */}
      <CardContent className="flex min-h-0 w-full flex-1 items-center justify-center p-6 pt-8">
        <div className="flex min-h-0 w-full items-center justify-center">
          <ChartContainer
            config={chartConfig}
            className="aspect-[2.2/1] max-h-70 w-full"
          >
            <BarChartIcon
              data={data.chartData}
              margin={{ left: -25, right: 10 }}
              barGap={3}
              // 마우스 무빙 시 현재 호버된 '달의 이름'을 상태에 즉시 동기화합니다
              onMouseMove={(state) => {
                if (state && state.activeLabel) {
                  setActiveMonth(state.activeLabel)

                  const currentData = data.chartData.find(
                    (d) => d.month === state.activeLabel
                  )
                  if (currentData) {
                    setActiveHeight(currentData.checkout)
                  }
                }
              }}
              // 마우스가 차트 영역을 벗어나면 시안 전용 7월 상태로 복귀합니다
              onMouseLeave={() => {
                setActiveMonth("Jul 2026")
                setActiveHeight(1300)
              }}
            >
              <CartesianGrid
                strokeDasharray="2 4"
                stroke="#2a2e3d"
                vertical={true}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                stroke="#64748b"
                className="text-[10px] font-medium"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                stroke="#64748b"
                className="text-[10px] font-medium"
              />

              <ChartTooltip cursor={false} content={<CustomTooltip />} />

              {/* Paid product 막대 (파란색) */}
              <Bar dataKey="paid" maxBarSize={22}>
                {data.chartData.map((entry, index) => (
                  <Cell
                    key={`cell-paid-${index}`}
                    fill={entry.month === activeMonth ? "#2563eb" : "#222530"}
                    radius={[4, 4, 0, 0]}
                    className="transition-all duration-200"
                  />
                ))}
              </Bar>

              {/* Checkout Product 막대 (하늘색) */}
              <Bar dataKey="checkout" maxBarSize={22}>
                {data.chartData.map((entry, index) => (
                  // 💡 155번째 줄 빈칸 부분 수치 [4, 4, 0, 0] 완벽 주입!
                  <Cell
                    key={`cell-checkout-${index}`}
                    fill={entry.month === activeMonth ? "#38bdf8" : "#222530"}
                    radius={[4, 4, 0, 0]}
                    className="transition-all duration-200"
                  />
                ))}
              </Bar>

              {/* 실시간 위치 이동 초록 점 인디케이터 */}
              {activeMonth && activeHeight && (
                <ReferenceDot
                  x={activeMonth}
                  y={activeHeight}
                  r={4}
                  fill="#10b981"
                  stroke="#161920"
                  strokeWidth={1.5}
                  isFront={true}
                  className="transition-all duration-150"
                />
              )}
            </BarChartIcon>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
