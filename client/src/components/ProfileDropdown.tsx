import { useState } from "react";
import { User, X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfile } from "@/hooks/useProfile";

export function ProfileDropdown() {
  const { profile, isLoading, error, fullName, ufid } = useProfile();
  const [showFullUFID, setShowFullUFID] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const maskUFID = (ufidValue: string) => {
    if (!ufidValue) return '';
    if (ufidValue.length <= 2) return ufidValue;
    
    const firstTwo = ufidValue.substring(0, 2);
    const masked = '•'.repeat(Math.max(0, ufidValue.length - 2));
    return firstTwo + masked;
  };

  const displayUFID = ufid ? (showFullUFID ? ufid : maskUFID(ufid)) : '';

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-white/10"
          data-testid="button-profile-dropdown"
        >
          <User className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 p-0"
        data-testid="dropdown-profile"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <span className="font-medium">Profile</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsOpen(false)}
            data-testid="button-close-profile"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4 space-y-3">
          {isLoading ? (
            <div className="text-sm text-muted-foreground">Loading profile...</div>
          ) : error ? (
            <div className="text-sm text-destructive">Failed to load profile</div>
          ) : (
            <>
              <div>
                <div className="font-medium text-base" data-testid="text-profile-name">
                  {fullName || 'User'}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">UFID:</span>
                  {ufid && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowFullUFID(!showFullUFID)}
                      data-testid="button-toggle-ufid"
                    >
                      {showFullUFID ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
                <div className="font-mono text-sm" data-testid="text-profile-ufid">
                  {displayUFID || 'Not available'}
                </div>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}