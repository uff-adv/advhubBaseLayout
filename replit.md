# Overview

This is a full-stack web application template built following the University of Florida's Mercury web theme guidelines. The application serves as a branded template for UF organizations, featuring SAML-based authentication, a modern React frontend with shadcn/ui components, and an Express.js backend. The template is designed to provide a professional, accessible, and brand-compliant foundation for building UF web applications.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom UF brand colors (UF Orange #FA4616, UF Blue #0021A5)
- **Typography**: Inter font family for primary text, JetBrains Mono for code/data
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: React Router with BrowserRouter, supports VITE_BASENAME environment variable
- **Theme System**: Light/dark mode support with CSS custom properties
- **Layout**: confine all new ui features to the "main" section

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Authentication**: Passport.js with SAML strategy for UF Single Sign-On integration
- **Session Management**: Express sessions with PostgreSQL storage using connect-pg-simple
- **API Design**: RESTful endpoints with consistent error handling and CSRF protection
- **Development**: Hot module replacement via Vite middleware integration

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Connection**: Neon Database serverless PostgreSQL for cloud deployment
- **Session Storage**: Database-backed sessions for scalability and persistence

## Authentication and Authorization
- **SAML Integration**: University of Florida Active Directory Federation Services
- **Session Security**: HTTP-only cookies, CSRF protection, secure flags in production
- **User Profile**: Complete SAML attribute mapping including roles and organizational data
- **Fallback Strategy**: Graceful degradation when SAML is not configured for development
- **Current State**: Authentication temporarily disabled for development

## External Dependencies
- **Database**: Neon Database (PostgreSQL-compatible serverless database)
- **Fonts**: Google Fonts (Inter, JetBrains Mono)
- **Authentication**: UF ADFS SAML Identity Provider
- **Development**: Replit integration with cartographer and runtime error overlay
- **UI Framework**: Radix UI primitives for accessible component foundation
- **Build Tools**: Vite for development server and production builds, esbuild for server bundling
### API Services
- **Menu System**: Dynamic menu populated from UF API at https://advapi.uff.ufl.edu/api/Test/TopMenu
- **Authentication**: Get auth token from https://advids.uff.ufl.edu/connect/token
  - Header: Content-Type should be set to application/x-www-form-urlencoded
  - Body: client ID and client secret

The architecture prioritizes University of Florida brand compliance, accessibility standards, and developer experience while maintaining scalability and security best practices.

## Recent Changes (September 2025)
- **Profile System**: Migrated profile dropdown from external API to SAML session data from `/api/auth/me`
- **Routing Migration**: Replaced Wouter with React Router and BrowserRouter for better integration
- **UFID Privacy**: Implemented masking functionality with toggle visibility for user UFID display
- **Authentication**: Currently disabled temporarily for development purposes
- **Main Content**: Cleared for template customization
- **Dynamic Menu System**: AdvancementHUB menu now fetches from UF API (https://advapi.uff.ufl.edu/api/Test/TopMenu)
  - Graceful fallback to default menu items when API is unavailable
  - Loading states and error handling implemented
  - Menu items include: Dashboard, Advancement, Analytics, Reports, Settings