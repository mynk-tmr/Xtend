# Technology	Purpose / Role

Next.js (App Router): Remember we have to optimise SEO.

Mantine UI + Tailwind : use Tailwind to do layouts and texts, use Mantine for components

Motion : will add animations.

TanStack Query : will be api layer and state manager too.

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

## Landing Page

- a very nice landing page, with animations that reflects the brand value. Use available websites as inspiration.


# AI agent followup

After, reading and analysing, the agent must ask clarifying questions