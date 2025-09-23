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
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to the AdvancementHUB Template</h1>
          <p className="text-muted-foreground">This template follows the AdvancementHUB's official web theme guidelines. Built with UF brand colors, professional styling, and accessibility compliance.etc.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle>UF Brand Compliance</CardTitle>
              <CardDescription>
                Using official University of Florida colors and branding guidelines
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
              <CardTitle>Mercury Components</CardTitle>
              <CardDescription>
                Professional styling following Mercury web theme patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary"
                onClick={() => handleButtonClick("Try theme")}
                data-testid="button-theme"
              >
                View Components
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle>Accessibility Ready</CardTitle>
              <CardDescription>
                Meets UF accessibility standards and WCAG guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline"
                onClick={() => handleButtonClick("Explore")}
                data-testid="button-components"
              >
                Accessibility Info
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
              <h3 className="font-semibold">Mercury Theme Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Official UF brand colors (Orange and Blue)</li>
                <li>Full-width header with dropdown navigation</li>
                <li>Responsive layout optimized for all devices</li>
                <li>Accessibility compliance following UF standards</li>
                <li>Professional Mercury theme styling</li>
                <li>Modular components for easy customization</li>
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
  );
}