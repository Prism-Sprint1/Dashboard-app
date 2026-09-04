import { BarChart3, Blocks, CreditCard, House, LayoutDashboard, Package, ReceiptText, ShoppingCart, Star, Tags, Users } from "lucide-react"

// 하단 유저 데이터
export const sidebarUser = {
  name: "Nathan Scott",
  email: "scott@example.com",
  avatar: "https://github.com/shadcn.png",
}

// 상단 팀 데이터
export const sidebarTeams = [
  {
    name: "Quantico",
    logo: Blocks,
    plan: "ID: CMP-1006",
  },
]

// 메인 네비게이션 데이터
export const sidebarNavMain = [
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
  }
]