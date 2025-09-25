import { ChevronDown, ExternalLink, Loader2 } from "lucide-react"
import { ProfileDropdown } from "./ProfileDropdown"
import { useTopMenu } from "@/hooks/useTopMenu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppHeader() {
  const { menuItems, isLoading, error } = useTopMenu();

  const handleMenuClick = (item: { title: string; url: string }) => {
    console.log(`Navigating to ${item.title}: ${item.url}`)
    // Add actual navigation logic here if needed
  }

  return (
    <header className="w-full flex items-center justify-between p-4 border-b bg-[#0016a8]">
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
              <h1 className="font-semibold text-xl text-white">AdvancementHUB</h1>
              <ChevronDown className="h-4 w-4 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>AdvancementHUB</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {isLoading ? (
              <DropdownMenuItem disabled className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading menu...</span>
              </DropdownMenuItem>
            ) : error ? (
              <DropdownMenuItem disabled className="flex items-center gap-2 text-destructive">
                <ExternalLink className="h-4 w-4" />
                <span>Menu unavailable</span>
              </DropdownMenuItem>
            ) : (
              menuItems
                .filter(item => item.isActive !== false)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((item) => (
                  <DropdownMenuItem 
                    key={item.id || item.title} 
                    onClick={() => handleMenuClick(item)}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{item.title}</span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2">
        <ProfileDropdown />
      </div>
    </header>
  );
}