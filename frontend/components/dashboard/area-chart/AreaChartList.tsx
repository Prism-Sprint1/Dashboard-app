// 어케 놓을지
"use client"

import AreaChart from "./AreaChart"
import { areaChartData } from "./data"

export function AreaChartList() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {areaChartData.map((card) => (
        <AreaChart key={card.id} {...card} />
      ))}
    </div>
  )
}
