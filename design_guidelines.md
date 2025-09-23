# Application Template Design Guidelines - Mercury Web Theme

## Design Approach
**Selected Approach**: University of Florida Mercury Web Theme
**System**: UF Brand Guidelines with Mercury theme components
**Justification**: Following UF's official Mercury web theme for brand consistency, accessibility compliance, and professional appearance using the university's established design patterns.

## Core Design Elements

### Color Palette (UF Brand Colors)
**Primary Colors**:
- UF Orange: 14 100% 53% (#FA4616)
- UF Blue: 232 100% 33% (#0021A5)

**Background Colors**:
- Light mode surfaces: 0 0% 98% (near white)
- Dark mode surfaces: 232 15% 8% (very dark blue)
- Card backgrounds: Clean white/light gray with subtle borders

**Accent Colors**:
- Interactive elements: UF Orange for primary actions
- Secondary elements: UF Blue for links and info
- Success states: 120 60% 45% (green)
- Warning states: UF Orange variant

### Typography
**Font Families**: 
- Primary: Inter (Google Fonts)
- Monospace: JetBrains Mono (for code/data)

**Hierarchy**:
- Header logo/brand: font-semibold text-xl
- Sidebar menu items: font-medium text-sm
- Main content headings: font-bold text-2xl, text-xl, text-lg
- Body text: font-normal text-base

### Layout System
**Spacing Units**: Consistent use of Tailwind units 2, 4, 6, and 8
- Tight spacing: p-2, gap-2 (8px)
- Standard spacing: p-4, gap-4 (16px) 
- Section spacing: p-6, gap-6 (24px)
- Major spacing: p-8, gap-8 (32px)

**Grid Structure**:
- Header: Fixed height h-16 (64px)
- Sidebar: Fixed width w-64 when expanded, w-16 when collapsed
- Main content: Flexible with max-width constraints

### Component Library

**Header Component**:
- Fixed position with subtle shadow
- Logo/brand on left, user actions on right
- Height: 64px with horizontal padding of 24px
- Background: Primary surface color with border

**Sidebar Navigation**:
- Collapsible from 256px to 64px width
- Menu items with icons and text labels
- Hover states with subtle background color changes
- Active state with left border accent
- Smooth transitions (duration-200)

**Main Content Area**:
- Responsive padding that adjusts to sidebar state
- Maximum content width for readability
- Card-based layouts for content sections
- Proper focus management for accessibility

**Interactive Elements**:
- Buttons: Rounded corners (rounded-md), consistent padding
- Form inputs: Clean borders, focus ring styling
- Cards: Subtle shadows with rounded corners
- Links: Underline on hover, color transitions

### Responsive Behavior
- **Desktop** (1024px+): Full sidebar visible, optimal spacing
- **Tablet** (768-1023px): Collapsible sidebar, adjusted padding
- **Mobile** (<768px): Overlay sidebar, touch-friendly interactions

### Animation Guidelines
**Minimal Approach**: Use only essential micro-interactions
- Sidebar collapse/expand: transform and width transitions
- Menu item hover: subtle background color changes
- Focus indicators: smooth border/shadow transitions
- Page transitions: Simple fade or slide effects (if any)

### Accessibility Requirements
- Consistent dark mode across all components
- Keyboard navigation support for all interactive elements
- Proper ARIA labels for sidebar states
- Color contrast ratios meeting WCAG AA standards
- Screen reader announcements for dynamic state changes

### Key Design Principles
1. **Consistency**: Establish patterns that scale across applications
2. **Flexibility**: Template should accommodate various content types
3. **Performance**: Lightweight with efficient state management
4. **Accessibility**: Universal design for all users
5. **Maintainability**: Clean component structure for easy updates

This template prioritizes utility and reusability while maintaining a professional, modern aesthetic suitable for business applications, dashboards, and productivity tools.