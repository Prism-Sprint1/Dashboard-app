import PageHeader from "@/components/common/PageHeader";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import AreaChart from "@/components/dashboard/area-chart/AreaChart";
import PieChart from "@/components/dashboard/pie-chart/PieChart";
import BarChart from "@/components/dashboard/bar-chart/BarChart";
import ProgressBar from "@/components/dashboard/progress-bar/ProgressBar";
import Table from "@/components/dashboard/table/table";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      {/* sidebar */}
      <Sidebar />
      <SidebarInset className="m-2 bg-content border rounded-xl">
        {/* header */}
        <PageHeader />
        <div className="p-4">
          <section className="w-full min-h-80 flex gap-4">
            {/* area chart */}
            <AreaChart />
            {/* pie chart */}
            <PieChart />
          </section>
          <section className="w-full min-h-80 mt-4 flex gap-4">
            {/* bar chart */}
            <BarChart />
            {/* progress bar */}
            <ProgressBar />
          </section>
          <Table />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
