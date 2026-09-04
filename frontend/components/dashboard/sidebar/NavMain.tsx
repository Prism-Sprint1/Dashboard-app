"use client"

import { useState } from "react"
// 실제 페이지 있을 경우 주석 해제
// import { useRouter } from "next/navigation"

import { type LucideIcon } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { useDashboardNavigation } from "@/components/dashboard/DashboardNavigation"

export function NavMain({ items }: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  // 현재 선택된 메뉴 상태
  const { activeItem, activeSubItem, setActiveItem, setActiveSubItem, setActiveIcon } = useDashboardNavigation()
  // 현재 펼쳐진 메뉴 상태
  const [openItem, setOpenItem] = useState("Dashboard")

  // 실제 페이지 있을 경우 주석 해제
  // const router = useRouter()

  // 메뉴 클릭 시 URL 변경
  // 실제 페이지 있을 경우 주석 해제
  // const handleUrlChange = (url: string) => {
  //   router.push(url)
  // }

  // 상위 메뉴 클릭 시 선택 및 하위 메뉴 상태 변경
  // typeof를 사용해 items 배열의 요소 타입 가져오기
  const handleItemClick = (item: (typeof items)[number]) => {
    setActiveItem(item.title)

    // 메뉴 아이콘 변경
    if (item.icon) setActiveIcon(item.icon)

    // ?. : 하위 메뉴가 존재하는 경우에만 length 확인
    if (item.items?.length) {
      setOpenItem(item.title)
      setActiveSubItem(item.items[0].title)
      // 실제 페이지 있을 경우 주석 해제
      // handleUrlChange(item.items[0].url)
    } else {
      setOpenItem("")
      setActiveSubItem("")
      // 실제 페이지 있을 경우 주석 해제
      // handleUrlChange(item.url)
    }
  }

  // 하위 메뉴 클릭 시 선택 및 URL 변경
  const handleSubItemClick = (subItem: { title: string; url: string }) => {
    setActiveSubItem(subItem.title)
    // 실제 페이지 있을 경우 주석 해제
    // handleUrlChange(subItem.url)
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          // 하위 메뉴가 없는 경우
          if (!item.items?.length) {
            return (
              <SidebarMenuItem key={item.title}>
                {/* 메뉴 클릭 시 선택 및 색상 변경 */}
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => handleItemClick(item)}
                  className={activeItem === item.title ? "text-foreground" : "text-muted-foreground"}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          // 하위 메뉴가 있는 경우
          return (
            <Collapsible
              key={item.title}
              render={<SidebarMenuItem />}
              open={openItem === item.title}
              className="group/collapsible"
            >
              {/* 메뉴 클릭 시 선택 */}
              <CollapsibleTrigger
                render={
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() => handleItemClick(item)}
                    className={activeItem === item.title ? "text-foreground" : "text-muted-foreground"}
                  />
                }
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      {/* 하위 메뉴 클릭 시 선택 */}
                      <SidebarMenuSubButton
                        onClick={() => handleSubItemClick(subItem)}
                        className={activeSubItem === subItem.title ? "text-foreground" : "text-muted-foreground"}
                      >
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
