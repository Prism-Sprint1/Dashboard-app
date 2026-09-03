"use client"

import { useState } from "react"

import { Calendar, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar"

export function SidebarCard() {
  // 사이드바 카드 표시 상태
  const [isVisible, setIsVisible] = useState(true)

  // false인 경우 null을 반환해 컴포넌트를 화면에서 숨김
  if (!isVisible) return null

  return (
    <div className="p-3 rounded-lg border border-sidebar-border bg-content group-data-[collapsible=icon]:hidden">
      <div className="flex items-center justify-between">
        {/* 팀 아바타 */}
        <AvatarGroup>
          <Avatar className="size-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="size-6">
            <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar className="size-6">
            <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </AvatarGroup>
        {/* 닫기 버튼 */}
        <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)} className="size-6 text-muted-foreground hover:text-foreground" >
          <X className="size-3.5" />
        </Button>
      </div>
      {/* 팝업 텍스트 */}
      <div className="mt-4">
        <p className="text-sm font-medium text-foreground">Need setup help?</p>
        <p className="mt-2 text-sm leading-4 text-muted-foreground"> Get your questions answered in a 1:1 call with our team. </p>
      </div>
      {/* 하단 버튼 */}
      <Button variant="outline" size="sm" className="mt-4 w-full text-xs">
        <Calendar className="size-3.5" />
        Schedule a call
      </Button>
    </div>
  )
}