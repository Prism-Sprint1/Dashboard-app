import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { TeamSwitcher } from "@/components/dashboard/sidebar/TeamSwitcher"
import { sidebarTeams } from "@/components/dashboard/sidebar/SidebarData"

export function AppSidebarHeader() {
  return (
    <div className="flex items-center group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1">
      <div className="min-w-0 flex-1 group-data-[collapsible=icon]:flex-none">
        <TeamSwitcher teams={sidebarTeams} />
      </div>
      {/* 검색 및 사이드바 여닫기 */}
      <div className="flex items-center group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground"
        >
          <Search className="size-4" />
        </Button>
        <SidebarTrigger className="size-8 text-muted-foreground hover:text-foreground" />
      </div>
    </div>
  )
}