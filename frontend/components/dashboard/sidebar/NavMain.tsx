"use client"

import { useState } from "react"

import { type LucideIcon } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
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
  const [activeItem, setActiveItem] = useState("Dashboard")
  // 현재 선택된 하위 메뉴 상태
  const [activeSubItem, setActiveSubItem] = useState("Analytics")
  // 현재 펼쳐진 메뉴 상태
  const [openItem, setOpenItem] = useState("Dashboard")

  // 상위 메뉴 클릭 시 선택 및 하위 메뉴 상태 변경
  // typeof를 사용해 items 배열의 요소 타입 가져오기
  const handleItemClick = (item: (typeof items)[number]) => {
    setActiveItem(item.title)

    // ?. : 하위 메뉴가 존재하는 경우에만 length 확인
    if (item.items?.length) {
      setOpenItem(item.title)
      setActiveSubItem(item.items[0].title)
    } else {
      setOpenItem("")
      setActiveSubItem("")
    }
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
              {/* 메뉴 클릭 시 선택 및 색상 변경 */}
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
                      {/* 하위 메뉴 클릭 시 선택 및 색상 변경 */}
                      <SidebarMenuSubButton
                        render={<a href={subItem.url} />}
                        onClick={() => setActiveSubItem(subItem.title)}
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
