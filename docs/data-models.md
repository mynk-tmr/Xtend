# Data Models Documentation

## User Model

```typescript
interface User {
  _id: ObjectId;
  email: string; // Unique identifier
  password: string; // Hashed
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatar?: string; // Cloudinary URL
  role: "user" | "admin"; // Default: "user"
  isEmailVerified: boolean; // Default: false
  createdAt: Date;
  updatedAt: Date;
}
```

## Property Listing Model

```typescript
interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  price: number; // Per night/month (to be clarified)
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  propertyType: "apartment" | "house" | "villa" | "studio" | "condo" | "other";
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[]; // Array of amenity names
  images: {
    url: string; // Cloudinary URL
    isThumbnail: boolean; // Only one image can be thumbnail
    _id: ObjectId;
  }[];
  tenantId: ObjectId; // Reference to User who owns the property
  isAvailable: boolean; // Default: true
  createdAt: Date;
  updatedAt: Date;
}
```

## Booking Model

```typescript
interface Booking {
  _id: ObjectId;
  listingId: ObjectId; // Reference to Listing
  renterId: ObjectId; // Reference to User who is booking
  status: "pending" | "approved" | "rejected" | "cancelled"; // Default: "pending"
  message?: string; // Message from renter to tenant
  responseMessage?: string; // Message from tenant to renter
  createdAt: Date;
  updatedAt: Date;
}
```

## Complaint Model

```typescript
interface Complaint {
  _id: ObjectId;
  complainantId: ObjectId; // Reference to User who filed complaint
  respondentId?: ObjectId; // Reference to User being complained about
  listingId?: ObjectId; // Reference to Listing if complaint is about a property
  subject: string;
  description: string;
  status: "open" | "investigating" | "resolved" | "dismissed"; // Default: "open"
  adminNotes?: string; // Private notes for admin
  createdAt: Date;
  updatedAt: Date;
}
```

## User Shortlist Model

```typescript
interface Shortlist {
  _id: ObjectId;
  userId: ObjectId; // Reference to User
  listingId: ObjectId; // Reference to Listing
  createdAt: Date;
}
```

## Relationships

1. User → Listings (One-to-Many): A user can have multiple property listings
2. User → Bookings (One-to-Many): A user can have multiple bookings (as renter)
3. Listing → Bookings (One-to-Many): A listing can have multiple booking requests
4. User → Complaints (One-to-Many): A user can file multiple complaints
5. User → Shortlists (One-to-Many): A user can shortlist multiple listings

## API Endpoints Structure

### Authentication Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me
- POST /api/auth/forgot-password
- POST /api/auth/reset-password
- POST /api/auth/verify-email

### User Management
- GET /api/users/profile
- PUT /api/users/profile
- DELETE /api/users/account
- POST /api/users/upload-avatar

### Listings
- GET /api/listings (with search, filter, pagination)
- GET /api/listings/:id
- POST /api/listings
- PUT /api/listings/:id
- DELETE /api/listings/:id
- POST /api/listings/:id/images
- DELETE /api/listings/:id/images/:imageId
- PUT /api/listings/:id/availability

### Bookings
- GET /api/bookings (user's bookings as renter)
- GET /api/bookings/requests (user's bookings as tenant)
- POST /api/bookings
- PUT /api/bookings/:id (approve/reject/cancel)
- GET /api/bookings/:id

### Shortlists
- GET /api/shortlists
- POST /api/shortlists
- DELETE /api/shortlists/:listingId

### Complaints
- GET /api/complaints
- POST /api/complaints
- PUT /api/complaints/:id (admin only)
- GET /api/admin/complaints (admin only)

### Admin
- GET /api/admin/users
- GET /api/admin/listings
- GET /api/admin/bookings
- PUT /api/admin/complaints/:id