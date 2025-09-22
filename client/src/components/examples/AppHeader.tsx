import { AppHeader } from '../AppHeader'
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AppHeaderExample() {
  // Custom sidebar width for better demonstration
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "4rem",
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <AppHeader />
    </SidebarProvider>
  )
}