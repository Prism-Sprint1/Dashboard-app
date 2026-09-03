import { Blocks, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { TeamSwitcher } from "@/components/dashboard/sidebar/TeamSwitcher"

const data = {
  // 상단 팀 데이터
  teams: [
    {
      name: "Quantico",
      logo: Blocks,
      plan: "ID: CMP-1006",
    },
  ],
}

export function AppSidebarHeader() {
  return (
    <div className="flex items-center group-data-[collapsible=icon]:flex-col">
      <div className="min-w-0 flex-1 group-data-[collapsible=icon]:flex-none">
        <TeamSwitcher teams={data.teams} />
      </div>
      {/* 검색 및 사이드바 여닫기 */}
      <div className="flex items-center group-data-[collapsible=icon]:flex-col">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground group-data-[collapsible=icon]:hidden"
        >
          <Search className="size-4" />
        </Button>
        <SidebarTrigger className="size-8 text-muted-foreground hover:text-foreground" />
      </div>
    </div>
  )
}