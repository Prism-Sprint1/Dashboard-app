import PageHeader from "@/components/common/PageHeader"
import Sidebar from "@/components/dashboard/sidebar/Sidebar"
import { AreaChartList } from "@/components/dashboard/area-chart/AreaChartList"
import PieChart from "@/components/dashboard/pie-chart/PieChart"
import BarChart from "@/components/dashboard/bar-chart/BarChart"
import ProgressBar from "@/components/dashboard/progress-bar/ProgressBar"
import OrderTable from "@/components/dashboard/order-table/OrderTable"
import { DashboardNavigationProvider } from "@/components/dashboard/DashboardNavigation"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <DashboardNavigationProvider>
      <SidebarProvider>
      {/* sidebar */}
      <Sidebar />
      <SidebarInset className="m-2 rounded-xl border bg-content">
        {/* header */}
        <PageHeader />
        <div className="p-4">
          <section className="flex min-h-80 w-full gap-4">
            {/* area chart */}
            <AreaChartList />
            {/* pie chart */}
            <PieChart />
          </section>
          <section className="mt-4 flex min-h-80 w-full gap-4">
            {/* bar chart */}
            <BarChart />
            {/* progress bar */}
            <ProgressBar />
          </section>
          <OrderTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
    </DashboardNavigationProvider>
  )
}
