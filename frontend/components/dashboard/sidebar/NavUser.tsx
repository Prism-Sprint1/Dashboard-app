"use client"

import { BadgeCheck, Bell, CreditCard, Ellipsis, LogOut, Sparkles, Zap } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="h-auto px-2 py-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              />
            }
          >
            {/* 유저 프로필 이미지 */}
            <div className="relative shrink-0">
              <Avatar className="size-9 rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>NS</AvatarFallback>
              </Avatar>
              <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-sidebar bg-green-500" />
            </div>

            {/* 유저 정보 */}
            <div className="grid min-w-0 flex-1 text-left leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-sm font-medium">{user.name}</span>
                <span className="flex items-center gap-0.5 rounded bg-violet-500/15 px-1.5 py-0.5 text-xs font-medium text-violet-400">
                  <Zap className="size-2.5! fill-current" />
                  PRO
                </span>
              </div>
              <span className="mt-0.5 truncate text-xs text-muted-foreground">{user.email}</span>
            </div>

            {/* 버튼 아이콘 */}
            <Ellipsis className="ml-auto size-4 shrink-0 text-muted-foreground" />
          </DropdownMenuTrigger>

          {/* 클릭 시 메뉴 */}
          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
            {/* 상단 프로필 */}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* 하위 메뉴 */}
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}