import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function MainContent() {
  const handleButtonClick = (action: string) => {
    console.log(`${action} button clicked`)
  }

  return (
    <div className="w-full overflow-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Your Application Template</h1>
          <p className="text-muted-foreground">
            This is a flexible template with header, sidebar navigation, and main content area. 
            Perfect foundation for building modern web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle>Responsive Design</CardTitle>
              <CardDescription>
                Built with mobile-first approach using Tailwind CSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleButtonClick("Learn more")}
                data-testid="button-responsive"
              >
                Learn More
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle>Dark Mode Ready</CardTitle>
              <CardDescription>
                Toggle between light and dark themes seamlessly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary"
                onClick={() => handleButtonClick("Try theme")}
                data-testid="button-theme"
              >
                Try Theme Toggle
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle>Component Library</CardTitle>
              <CardDescription>
                Pre-built components using Shadcn UI system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline"
                onClick={() => handleButtonClick("Explore")}
                data-testid="button-components"
              >
                Explore Components
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              This template provides a solid foundation for your next project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Template Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Collapsible sidebar navigation with dynamic menu items</li>
                <li>Responsive header with theme toggle</li>
                <li>Flexible main content area</li>
                <li>Dark/light mode support</li>
                <li>Professional styling with Shadcn UI</li>
                <li>Ready for customization and extension</li>
              </ul>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => handleButtonClick("Get started")}
                data-testid="button-get-started"
              >
                Get Started
              </Button>
              <Button 
                variant="ghost"
                onClick={() => handleButtonClick("View docs")}
                data-testid="button-docs"
              >
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}