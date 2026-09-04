"use client"

import * as React from "react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

import { AppSidebarHeader } from "@/components/dashboard/sidebar/SidebarHeader"
import { NavMain } from "@/components/dashboard/sidebar/NavMain"
import { NavUser } from "@/components/dashboard/sidebar/NavUser"
import { SidebarCard } from "@/components/dashboard/sidebar/SidebarCard"
import { sidebarNavMain, sidebarUser } from "@/components/dashboard/sidebar/SidebarData"

// collapsible="icon" : 사이드바를 접었을 때 메뉴 아이콘만 표시
export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* 사이드바 헤더 */}
        <AppSidebarHeader />
      </SidebarHeader>

      <SidebarContent>
        {/* 사이드바 메뉴 */}
        <NavMain items={sidebarNavMain} />
      </SidebarContent>

      <SidebarFooter className="gap-4">
        {/* 팝업 카드 */}
        <SidebarCard />
        {/* 유저 프로필 */}
        <NavUser user={sidebarUser} />
      </SidebarFooter>
      {/* 사이드바 여닫이 */}
      <SidebarRail />
    </Sidebar>
  )
}