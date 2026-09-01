"use client"

import * as React from "react"

import { BarChart3, Blocks, CreditCard, House, LayoutDashboard, Package, ReceiptText, Search, ShoppingCart, Star, Tags, Users } from "lucide-react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar"

import { NavMain } from "@/components/dashboard/sidebar/NavMain"
import { NavUser } from "@/components/dashboard/sidebar/NavUser"
import { TeamSwitcher } from "@/components/dashboard/sidebar/TeamSwitcher"
import { SidebarCard } from "@/components/dashboard/sidebar/SidebarCard"

// 사이드바 데이터
const data = {
  // 하단 유저 데이터
  user: {
    name: "Nathan Scott",
    email: "scott@example.com",
    avatar: "",
  },
  // 상단 팀 데이터
  teams: [
    {
      name: "Quantico",
      logo: Blocks,
      plan: "ID: CMP-1006",
    },
  ],
  // 메인 네비게이션
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: House,
    },
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Analytics",
          url: "#",
        },
        {
          title: "Sales Overview",
          url: "#",
        },
        {
          title: "Top Products",
          url: "#",
        },
        {
          title: "Stock Status",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart3,
    },
    {
      title: "Products",
      url: "#",
      icon: Package,
    },
    {
      title: "Categories",
      url: "#",
      icon: Tags,
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCart,
    },
    {
      title: "Taxes",
      url: "#",
      icon: ReceiptText,
    },
    {
      title: "Customers",
      url: "#",
      icon: Users,
    },
    {
      title: "Reviews",
      url: "#",
      icon: Star,
    },
    {
      title: "Payments",
      url: "#",
      icon: CreditCard,
    },
  ],
}

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* 사이드바 헤더 */}
      <SidebarHeader>
        <div className="flex items-center group-data-[collapsible=icon]:flex-col">
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:flex-none">
            <TeamSwitcher teams={data.teams} />
          </div>
          {/* 검색 및 사이드바 여닫기 */}
          <div className="flex items-center group-data-[collapsible=icon]:flex-col">
            <button
              type="button"
              className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground group-data-[collapsible=icon]:hidden"
            >
              <Search className="size-4" />
            </button>
            <SidebarTrigger className="size-8 text-muted-foreground hover:text-foreground" />
          </div>
        </div>
      </SidebarHeader>

      {/* 사이드바 메뉴 */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* 사이드바 푸터 */}
      <SidebarFooter>
        <SidebarCard />
        <NavUser user={data.user} />
      </SidebarFooter>
      {/* 사이드바 여닫이 */}
      <SidebarRail />
    </Sidebar>
  )
}