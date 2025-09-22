import { ThemeToggle } from '../ThemeToggle'

export default function ThemeToggleExample() {
  return (
    <div className="flex items-center gap-4 p-4">
      <span className="text-sm text-muted-foreground">Theme Toggle:</span>
      <ThemeToggle />
      <span className="text-xs text-muted-foreground">Click to toggle light/dark mode</span>
    </div>
  )
}