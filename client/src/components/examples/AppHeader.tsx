import { AppHeader } from '../AppHeader'

export default function AppHeaderExample() {
  return (
    <div className="w-full">
      <AppHeader />
      <div className="p-4 text-sm text-muted-foreground">
        Click the logo to see the dropdown menu
      </div>
    </div>
  )
}