# Technology	Purpose / Role

Next.js (App Router): Remember we have to optimise SEO.

Mantine UI + Tailwind : use Tailwind to do layouts and texts, use Mantine for components. Avoid following Mantine layout components

Layout
AppShell
AspectRatio
Center
Container
Flex
Grid
Group
SimpleGrid
Space
Stack
Text

Motion : will add animations.

TanStack Query : will be api layer and state manager too. Use the HydrateBoundary + prefetchquery pattern where possible

Zod: schemas for frontend backend communication

React Hook Form : to handle forms [share zod schemas if possible]

Better-Auth	libary + Resend : will handle email password auth, update user, send password reset and email verification

Hono Backend API : Instead of server functions, we will use REST pattern

MongoDB + driver : for database. We will use schemaless db because our requirements are very flexible.

Cloudinary : to store images

Mapbox :	Rendering maps for listing locations, map markers.

# Main App Functional Requirements

## User Management

- users can be renter / tenant / admin
- users can register / login / update / delete account
- users can shortlist, book and browse listing as renter
- users can list properties and see booking requests as tenant
- a user can act both as renter and tenant
- users have a combined dashboard that displays their renter + tenant related data
- admin can recieve complaints and act on them

## Dashboard

- CRUD listings. The agent must brainstorm the appropriate model to use 
- Upload Image for listings [1-6] / one act as thumbnail / user image
- confirm / reject booking (as tenant) {unupdatable}
- request / cancel booking (as renter) {unupdatable}
- tenant can toggle a listing's availability. It will not appear in search or bookable.
- search via name the listings they listed or booked (history)
- view metrics for tenants

## Search Listings

- The agent must decide search filter sort based on listing model decided.
- Also add keyword search using mongodb's modern features
- When a listing is viewed, display it's entire info and MapBox
- the Mapbox can show listings nearby as pins too

## Caching

- tanstack query must efficiently manage state and reduce api calls
- session managment can be done with better auth hooks


# Directory Organization

```
xtended/
├── app/                          # Next.js App Router
│   ├── auth/                   # Auth routes group
│   │   ├── for/[mode]           #mode is dynamic sign-up or login
│   │   │   └── page.tsx
│   │   ├── password/[mode]      #mode is dynamic forgot, reset
│   │   │   └── page.tsx
│   ├── dashboard/                # Dashboard routes group
│   │       ├── page.tsx          # Combined renter/tenant dashboard
│   │       ├── listings/
│   │       │   ├── page.tsx      # View all listings
│   │       │   ├── [id]/
│   │       │   │   └── page.tsx  # View listing details
│   │       │   └── new/
│   │       │       └── page.tsx  # Create new listing
│   │       ├── bookings/
│   │       │   ├── page.tsx      # View bookings as renter
│   │       │   └── requests/
│   │       │       └── page.tsx  # View booking requests as tenant
│   │       ├── profile/
│   │       │   └── page.tsx      # User profile
│   │       └── shortlists/
│   │          └── page.tsx      # User's shortlisted properties
│   │── admin/
│   │       ├── dashboard/
│   │       │   └── page.tsx      # Admin dashboard
│   │       ├── users/
│   │       │   └── page.tsx      # Manage users
│   │       ├── listings/
│   │       │   └── page.tsx      # Manage listings
│   │       ├── complaints/
│   │       │   └── page.tsx      # Manage complaints
│   │       └── login/
│   │           └── page.tsx      # Admin login
│   ├── listings/                 # Public listing pages
│   │   ├── page.tsx              # Search/browse listings
│   │   └── [id]/
│   │       └── page.tsx          # Listing details page
│   ├── home/
│   │   └── page.tsx              # Home page
│   ├── layout.tsx                # Root layout
│   ├── route.ts                  # Root route redirect
│   └── globals.css               # Global styles
├── components/                    # Reusable UI components
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navigation.tsx
│   ├── auth/                     # Auth related components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── PasswordResetForm.tsx
│   │   └── EmailVerification.tsx
│   ├── listing/                  # Listing related components
│   │   ├── ListingCard.tsx
│   │   ├── ListingForm.tsx
│   │   ├── ListingDetails.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── SearchFilters.tsx
│   │   └── MapView.tsx
│   ├── booking/                  # Booking related components
│   │   ├── BookingCard.tsx
│   │   ├── BookingForm.tsx
│   │   ├── BookingStatus.tsx
│   │   └── BookingHistory.tsx
│   ├── dashboard/                # Dashboard components
│   │   ├── DashboardStats.tsx
│   │   ├── RecentActivity.tsx
│   │   ├── QuickActions.tsx
│   │   └── MetricsChart.tsx
│   └── admin/                    # Admin components
│       ├── UserTable.tsx
│       ├── ListingTable.tsx
│       ├── ComplaintTable.tsx
│       └── AdminStats.tsx
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Better-Auth configuration
│   ├── db.ts                     # MongoDB connection
│   ├── validations/              # Zod schemas
│   │   ├── auth.ts
│   │   ├── listing.ts
│   │   ├── booking.ts
│   │   └── user.ts
│   ├── api/                      # API utilities
│   │   ├── client.ts             # API client configuration
│   │   ├── endpoints.ts          # API endpoints
│   │   └── types.ts              # API type definitions
│   ├── utils/                    # General utilities
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── formatters.ts
│   └── hooks/                    # Custom React hooks
│       ├── useAuth.ts
│       ├── useListing.ts
│       ├── useBooking.ts
│       └── useUpload.ts
├── server/                       # Backend API (Hono)
│   ├── index.ts                  # Hono app entry point
│   ├── routes/                   # API routes
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── listings.ts
│   │   ├── bookings.ts
│   │   ├── shortlists.ts
│   │   ├── complaints.ts
│   │   └── admin.ts
│   ├── middleware/               # Hono middleware
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   ├── error.ts
│   │   └── cors.ts
│   ├── models/                   # MongoDB models
│   │   ├── User.ts
│   │   ├── Listing.ts
│   │   ├── Booking.ts
│   │   ├── Complaint.ts
│   │   └── Shortlist.ts
│   └── services/                 # Business logic
│       ├── authService.ts
│       ├── listingService.ts
│       ├── bookingService.ts
│       ├── emailService.ts
│       └── uploadService.ts
├── public/                       # Static assets
│   ├── icons/
│   ├── images/
│   └── favicon.ico
├── styles/                       # Global styles
│   └── globals.css
├── docs/                         # Documentation
│   ├── data-models.md
│   ├── project-structure.md
│   └── api-documentation.md
├── .env.local                    # Environment variables (not committed)
├── .env.example                  # Example environment variables
├── .gitignore
├── biome.json
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Key Architectural Decisions

- leverage dynamic routes where possible
- split components and make them resuable when possible
- never recreate basic components, check mantine website to see if it's available.
- backend is separate to maintain Seperation
- All Zod schemas are in the `lib/validations` directory for reuse across frontend and backend.
- Client Business logic is encapsulated in custom hooks to promote code reusability 
- Server Business logic is abstracted into service functions in the backend to keep route handlers clean.
