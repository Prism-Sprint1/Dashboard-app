"use client"

import * as React from "react"

import { BarChart3, CreditCard, GalleryVerticalEnd, House, LayoutDashboard, Package, ReceiptText, ShoppingCart, Star, Tags, Users } from "lucide-react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

import { NavMain } from "@/components/dashboard/sidebar/NavMain"
import { NavUser } from "@/components/dashboard/sidebar/NavUser"
import { TeamSwitcher } from "@/components/dashboard/sidebar/TeamSwitcher"

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
      logo: GalleryVerticalEnd,
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
      isActive: true,
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
      title: "Analytics",
      url: "#",
      icon: BarChart3,
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
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}