import { LucideIcon } from "lucide-react"

export type AreaChartPoint = {
  label: number
  value: number
}

export type AreaChartData = {
  id: string
  title: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
  value: string
  unit: string
  changeRate: number
  points: AreaChartPoint[]
}
