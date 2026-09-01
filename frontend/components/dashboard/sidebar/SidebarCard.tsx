import { Button } from "@/components/ui/button"

export function SidebarCard() {
  return (
    <div className="p-3 rounded-lg border border-sidebar-border bg-[#242424] group-data-[collapsible=icon]:hidden">
      <div>
        <p className="text-sm font-medium text-foreground">Need setup help?</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Get your questions answered in a 1:1 call with our team.
        </p>
      </div>
      <Button variant="outline" size="sm" className="mt-3 w-full">
        Schedule a call
      </Button>
    </div>
  )
}