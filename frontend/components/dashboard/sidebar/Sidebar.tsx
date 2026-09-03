"use client"

import * as React from "react"

import { BarChart3, CreditCard, House, LayoutDashboard, Package, ReceiptText, ShoppingCart, Star, Tags, Users } from "lucide-react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

import { AppSidebarHeader } from "@/components/dashboard/sidebar/SidebarHeader"
import { NavMain } from "@/components/dashboard/sidebar/NavMain"
import { NavUser } from "@/components/dashboard/sidebar/NavUser"
import { SidebarCard } from "@/components/dashboard/sidebar/SidebarCard"

// 사이드바 데이터
const data = {
  // 하단 유저 데이터
  user: {
    name: "Nathan Scott",
    email: "scott@example.com",
    avatar: "https://github.com/maxleiter.png",
  },
  // 메인 네비게이션
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: House,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      items: [
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
        {
          title: "Sales Overview",
          url: "/dashboard/sales-overview",
        },
        {
          title: "Top Products",
          url: "/dashboard/top-products",
        },
        {
          title: "Stock Status",
          url: "/dashboard/stock-status",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
      items: [
        {
          title: "Overview",
          url: "/analytics/overview",
        },
        {
          title: "Reports",
          url: "/analytics/reports",
        },
        {
          title: "Performance",
          url: "/analytics/performance",
        },
      ],
    },
    {
      title: "Products",
      url: "/products",
      icon: Package,
      items: [
        {
          title: "All Products",
          url: "/products/all",
        },
        {
          title: "Inventory",
          url: "/products/inventory",
        },
        {
          title: "Add Product",
          url: "/products/add",
        },
      ],
    },
    {
      title: "Categories",
      url: "/categories",
      icon: Tags,
      items: [
        {
          title: "All Categories",
          url: "/categories/all",
        },
        {
          title: "Add Category",
          url: "/categories/add",
        },
      ],
    },
    {
      title: "Orders",
      url: "/orders",
      icon: ShoppingCart,
      items: [
        {
          title: "All Orders",
          url: "/orders/all",
        },
        {
          title: "Pending",
          url: "/orders/pending",
        },
        {
          title: "Completed",
          url: "/orders/completed",
        },
      ],
    },
    {
      title: "Taxes",
      url: "/taxes",
      icon: ReceiptText,
      items: [
        {
          title: "Tax Overview",
          url: "/taxes/overview",
        },
        {
          title: "Tax Rates",
          url: "/taxes/rates",
        },
      ],
    },
    {
      title: "Customers",
      url: "/customers",
      icon: Users,
      items: [
        {
          title: "All Customers",
          url: "/customers/all",
        },
        {
          title: "Customer Groups",
          url: "/customers/groups",
        },
      ],
    },
    {
      title: "Reviews",
      url: "/reviews",
      icon: Star,
      items: [
        {
          title: "All Reviews",
          url: "/reviews/all",
        },
        {
          title: "Pending Reviews",
          url: "/reviews/pending",
        },
      ],
    },
    {
      title: "Payments",
      url: "/payments",
      icon: CreditCard,
      items: [
        {
          title: "Transactions",
          url: "/payments/transactions",
        },
        {
          title: "Payment Methods",
          url: "/payments/methods",
        },
      ],
    },
  ]
}

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
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className="gap-4">
        {/* 팝업 카드 */}
        <SidebarCard />
        {/* 유저 프로필 */}
        <NavUser user={data.user} />
      </SidebarFooter>
      {/* 사이드바 여닫이 */}
      <SidebarRail />
    </Sidebar>
  )
}