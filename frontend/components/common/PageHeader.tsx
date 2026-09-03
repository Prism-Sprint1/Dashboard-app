import Link from "next/link"
import { DotIcon, House, LayoutDashboard, UserRoundPlus } from "lucide-react"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function PageHeader() {
  return (
    <header className="p-2 border-b flex items-center justify-between">
      {/* 좌측 ui */}
      {/* breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <House className="w-5" />
            <BreadcrumbLink render={<Link href="/">Home</Link>} />
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <DotIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <LayoutDashboard className="w-5" />
            <BreadcrumbLink render={<Link href="/">Dashboard</Link>} />
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <DotIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Analytics</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* 우측 ui */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
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

        <Button className="border">
          <UserRoundPlus />
          Invite
        </Button>
      </div>
    </header>
  );
}
