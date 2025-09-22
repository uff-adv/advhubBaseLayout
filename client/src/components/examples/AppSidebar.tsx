import { AppSidebar } from '../AppSidebar'
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AppSidebarExample() {
  // Custom sidebar width for better demonstration
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "4rem",
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-96 w-full">
        <AppSidebar />
        <div className="flex-1 p-4">
          <p className="text-muted-foreground">Main content area would go here</p>
        </div>
      </div>
    </SidebarProvider>
  )
}