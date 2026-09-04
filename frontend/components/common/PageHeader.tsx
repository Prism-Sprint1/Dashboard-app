"use client"

import Link from "next/link"
// 실제 페이지 있을 경우 주석 해제
// import { usePathname } from "next/navigation"

import { DotIcon, House, UserRoundPlus } from "lucide-react"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useDashboardNavigation } from "@/components/dashboard/DashboardNavigation"

export default function PageHeader() {
  // 실제 페이지 구현 시 pathname 기준으로 메뉴 상태 동기화
  // const pathname = usePathname()

  // 현재 선택된 메뉴 상태
  const { activeItem, activeSubItem, activeIcon: ActiveIcon } = useDashboardNavigation()

  return (
    <header className="p-2 border-b flex items-center justify-between">
      {/* 좌측 ui */}
      <Breadcrumb>
        <BreadcrumbList>
          {/* 홈 메뉴 */}
          <BreadcrumbItem>
            <House className="w-5" />
            {activeItem === "Home" ? (
              <BreadcrumbPage>Home</BreadcrumbPage>
            ) : (
              <BreadcrumbLink render={<Link href="/">Home</Link>} />
            )}
          </BreadcrumbItem>

          {/* 상위 메뉴 */}
          {activeItem !== "Home" && (
            <>
              <BreadcrumbSeparator>
                <DotIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <ActiveIcon className="w-5" />
                <BreadcrumbLink>{activeItem}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          {/* 하위 메뉴 */}
          {activeItem !== "Home" && activeSubItem && (
            <>
              <BreadcrumbSeparator>
                <DotIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{activeSubItem}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* 우측 ui */}
      <div className="flex items-center gap-4">
        <AvatarGroup>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <AvatarGroupCount className="bg-background border">
            +
            <span>9</span>
          </AvatarGroupCount>
        </AvatarGroup>

        <Button variant="outline" className="bg-content text-foreground">
          <UserRoundPlus />
          Invite
        </Button>
      </div>
    </header>
  )
}
