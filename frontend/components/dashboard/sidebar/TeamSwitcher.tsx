"use client"

import * as React from "react"
import { ChevronDown, Plus } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  // 첫 번째 팀을 기본 선택 상태로 설정
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  // 선택 가능한 팀이 없는 경우 컴포넌트 숨김
  if (!activeTeam) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              />
            }
          >
            {/* 팀 로고 */}
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#343434]">
              <activeTeam.logo className="size-4 text-[#e8a0b5]" />
            </div>
            {/* 팀 이름 및 ID */}
            <div className="grid flex-1 text-left text-sm leading-tight">
              <div className="flex items-center gap-1">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <ChevronDown className="size-3.5" />
              </div>
              <span className="truncate text-xs text-muted-foreground">{activeTeam.plan}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {/* 팀 선택 메뉴 */}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Teams
              </DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <team.logo className="size-3.5 shrink-0" />
                  </div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
