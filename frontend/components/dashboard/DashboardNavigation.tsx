"use client"

import { createContext, useContext, useState } from "react"

import { type LucideIcon, LayoutDashboard } from "lucide-react"

type NavigationState = {
  activeItem: string
  activeSubItem: string
  activeIcon: LucideIcon
  // 문자열을 받아 상태를 변경하고 반환값이 없는 함수
  setActiveItem: (item: string) => void
  setActiveSubItem: (item: string) => void
  setActiveIcon: (icon: LucideIcon) => void
}

// 대시보드 메뉴 상태 생성
const DashboardNavigationContext = createContext<NavigationState | null>(null)

export function DashboardNavigationProvider({ children }: { children: React.ReactNode }) {
  // 현재 선택된 상위 메뉴 상태
  const [activeItem, setActiveItem] = useState("Dashboard")
  // 현재 선택된 하위 메뉴 상태
  const [activeSubItem, setActiveSubItem] = useState("Analytics")
  // 현재 선택된 메뉴 아이콘 상태
  const [activeIcon, setActiveIcon] = useState<LucideIcon>(LayoutDashboard)

  return (
    <DashboardNavigationContext.Provider value={{ activeItem, activeSubItem, activeIcon, setActiveItem, setActiveSubItem, setActiveIcon }}>
      {children}
    </DashboardNavigationContext.Provider>
  )
}

// 대시보드 메뉴 상태 사용
export function useDashboardNavigation() {
  const context = useContext(DashboardNavigationContext)

  // Provider 외부에서 사용할 경우 오류 발생
  if (!context) throw new Error("useDashboardNavigation must be used within DashboardNavigationProvider")

  return context
}