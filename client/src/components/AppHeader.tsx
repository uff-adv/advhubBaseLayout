import { Calendar, Home, Inbox, Search, Settings, Users, FileText, BarChart3, ChevronDown } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Template menu items - can be easily customized for different applications
const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Documents",
    url: "/documents",
    icon: FileText,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
]

const secondaryItems = [
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppHeader() {
  const handleMenuClick = (item: typeof menuItems[0]) => {
    console.log(`Navigating to ${item.title}: ${item.url}`)
  }

  return (
    <header className="w-full flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 hover-elevate"
              data-testid="button-menu-toggle"
            >
              <div className="h-8 w-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">UF</span>
              </div>
              <h1 className="font-semibold text-xl text-foreground">AdvancementHUB</h1>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Application</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {menuItems.map((item) => (
              <DropdownMenuItem 
                key={item.title} 
                onClick={() => handleMenuClick(item)}
                data-testid={`nav-${item.title.toLowerCase()}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Tools</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {secondaryItems.map((item) => (
              <DropdownMenuItem 
                key={item.title} 
                onClick={() => handleMenuClick(item)}
                data-testid={`nav-${item.title.toLowerCase()}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  )
}