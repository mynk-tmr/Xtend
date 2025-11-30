# Project Structure

## Directory Organization

```
xtended/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── reset-password/
│   │       └── page.tsx
│   ├── (dashboard)/              # Dashboard routes group
│   │   ├── dashboard/
│   │   │   ├── page.tsx          # Combined renter/tenant dashboard
│   │   │   ├── listings/
│   │   │   │   ├── page.tsx      # View all listings
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx  # View listing details
│   │   │   │   └── new/
│   │   │   │       └── page.tsx  # Create new listing
│   │   │   ├── bookings/
│   │   │   │   ├── page.tsx      # View bookings as renter
│   │   │   │   └── requests/
│   │   │   │       └── page.tsx  # View booking requests as tenant
│   │   │   ├── profile/
│   │   │   │   └── page.tsx      # User profile
│   │   │   └── shortlists/
│   │   │       └── page.tsx      # User's shortlisted properties
│   ├── (admin)/                  # Admin routes group
│   │   └── admin/
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

1. **Route Groups**: Using Next.js route groups to organize pages by functionality:
   - `(auth)`: Authentication related pages
   - `(dashboard)`: User dashboard pages
   - `(admin)`: Admin-specific pages

2. **Component Organization**: Components are organized by feature/domain rather than type, making it easier to find related components.

3. **Mantine UI + Tailwind CSS**: 
   - Using Mantine for pre-built UI components (buttons, forms, modals, etc.)
   - Using Tailwind CSS for layout, spacing, and custom styling
   - No need to create basic UI components since Mantine provides them

4. **Separate Backend**: Using Hono as a separate backend API server to maintain clear separation between frontend and backend.

5. **Centralized Validations**: All Zod schemas are in the `lib/validations` directory for reuse across frontend and backend.

6. **Custom Hooks**: Business logic is encapsulated in custom hooks to promote code reusability and separation of concerns.

7. **Service Layer**: Business logic is abstracted into service functions in the backend to keep route handlers clean.

## File Naming Conventions

1. **Components**: PascalCase with descriptive names (e.g., `ListingCard.tsx`)
2. **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
3. **Utilities**: camelCase (e.g., `formatters.ts`)
4. **Pages**: `page.tsx` for Next.js App Router
5. **Layouts**: `layout.tsx` for Next.js App Router

## Import Path Conventions

1. **Components**: `@/components/layout/Header`
2. **Mantine Components**: Direct import from `@mantine/core`
3. **Lib**: `@/lib/auth`
4. **Hooks**: `@/lib/hooks/useAuth`
5. **Types**: `@/lib/types`
6. **Utils**: `@/lib/utils/helpers`