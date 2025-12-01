# Data Models Documentation

## User Model

```typescript
interface User {
  //see better-auth documentation
}
```

## Storage Listing Model

```typescript
interface StorageListing {
  _id: ObjectId;
  title: string;
  description: string;
  price: {
    value: number;
    basis: 'month' | 'day' | 'week'
  }
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
  
  // Storage-specific fields
  storageType: StorageType;
  area: number; // Square feet
  height: number; // Ceiling height in feet
  loadingCapacity?: number; // Weight capacity in kg/tons
  
  // Access and availability
  accessHours: {
    type: "24_7" | "business_hours" | "restricted" | "weekends";
    description?: string; // by user to describe access hours
  };
  
  // Storage-specific optional fields (only relevant based on storageType)
  // Self Storage fields
  unitNumber?: string;
  floorLevel?: number;
  unitSize?: "small" | "medium" | "large" | "extra_large";
  driveUpAccess?: boolean;
  
  // Warehouse fields
  warehouseSize?: "small" | "medium" | "large";
  dockDoors?: number;
  officeSpace?: number; // sq ft
  ceilingHeight?: number; // feet
  sprinklerSystem?: boolean;
  forkliftAvailable?: boolean;
  truckAccess?: boolean;
  
  // Commercial fields
  businessType?: "retail" | "restaurant" | "office" | "pharmacy" | "other";
  shelvingIncluded?: boolean;
  displayArea?: boolean;
  customerAccess?: boolean;
  loadingDock?: boolean;
  
  // Vehicle fields
  vehicleType?: "car" | "rv" | "boat" | "motorcycle" | "fleet";
  coveredParking?: boolean;
  securityGuard?: boolean;
  washBay?: boolean;
  maintenanceArea?: boolean;
  chargingStation?: boolean;
  
  // Specialized fields
  specialtyType?: "wine" | "art" | "antique" | "electronics" | "documents";
  temperatureRange?: { min: number; max: number }; // Celsius
  humidityControl?: boolean;
  lightControl?: boolean;
  vibrationControl?: boolean;
  airQualityControl?: boolean;
  
  // Workshop fields
  workshopType?: "woodworking" | "auto" | "art" | "maker" | "general";
  ventilationSystem?: boolean;
  powerSupply?: number; // amps
  workbenches?: boolean;
  toolStorage?: boolean;
  soundProofing?: boolean;
  
  // Coworking fields
  spaceType?: "hybrid" | "flexible" | "popup";
  meetingRooms?: boolean;
  wifiIncluded?: boolean;
  kitchenAccess?: boolean;
  receptionService?: boolean;
  
  // Agricultural fields
  agricultureType?: "grain" | "equipment" | "produce" | "livestock" | "other";
  drainageSystem?: boolean;
  loadingEquipment?: boolean;
  
  // Common fields
  climateControlled?: boolean;
  individualAlarm?: boolean;
  pestControl?: boolean;
  
  amenities: ObjectId[]; // References to Amenity documents
  images: {
    url: string; // Cloudinary URL
    isThumbnail: boolean; // Only one image can be thumbnail
    _id: ObjectId;
  }[];
  tenantId: ObjectId; // Reference to User who owns property
  isAvailable: boolean; // Default: true
  createdAt: Date;
  updatedAt: Date;
}

// Storage Types
type StorageType = 
  | "self_storage"
  | "warehouse"
  | "commercial"
  | "vehicle"
  | "specialized"
  | "workshop"
  | "coworking"
  | "agricultural";
```

## Amenity Model

```typescript
interface Amenity {
  _id: ObjectId;
  name: string;
  category: "security" | "convenience" | "specialized" | "service";
  icon: string; // Icon identifier
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Predefined Amenity Categories
const AMENITY_CATEGORIES = {
  security: [
    "24/7 CCTV Surveillance",
    "Individual Unit Alarms",
    "Security Personnel",
    "Gated Access",
    "Keypad Entry",
    "Biometric Access",
    "Motion Sensors",
    "Security Patrol"
  ],
  convenience: [
    "Loading Dock",
    "Elevator Access",
    "Moving Carts Available",
    "Drive-up Access",
    "Forklift Service",
    "Package Acceptance",
    "Online Account Management",
    "Mobile App Access"
  ],
  specialized: [
    "Climate Control",
    "Humidity Control",
    "Temperature Monitoring",
    "Pest Control",
    "Fire Suppression System",
    "Ventilation System",
    "Air Filtration",
    "Backup Power Generator"
  ],
  service: [
    "Insurance Available",
    "Online Bill Pay",
    "Month-to-Month Leases",
    "Moving Supplies",
    "Truck Rental",
    "Concierge Service",
    "Mail Forwarding",
    "Inventory Management"
  ]
};
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

## Search and Filtering Parameters

```typescript
interface StorageSearchParams {
  // Basic search
  search?: string;
  limit?: number;
  skip?: number;
  
  // Storage-specific filters
  storageType?: StorageType[];
  areaRange?: { min: number; max: number };
  accessType?: "24_7" | "business_hours" | "restricted" | "weekends";
  amenities?: string[]; // Amenity IDs or names
  
  // Specialized filters
  temperatureControlled?: boolean;
  climateControlled?: boolean;
  vehicleType?: ("car" | "rv" | "boat" | "motorcycle" | "fleet")[];
  businessType?: ("retail" | "restaurant" | "office" | "pharmacy" | "other")[];
  
  // Location-based
  city?: string;
  state?: string;
  country?: string;
  coordinates?: { lat: number; lng: number; radius: number }; // radius in km
  
  // Price filtering
  priceRange?: { min: number; max: number };
  priceBasis?: 'month' | 'day' | 'week';
  
  // Sorting
  sortBy?: "price" | "area" | "newest" | "rating";
  sortOrder?: "asc" | "desc";
}
```

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

### Storage-specific Endpoints
- GET /api/storage/types (get all storage types)
- GET /api/storage/amenities (get all amenities by category)
- GET /api/storage/search (advanced storage search)
- GET /api/storage/recommendations (get recommendations based on user preferences)

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
- GET /api/admin/storage/analytics (storage usage analytics)
- POST /api/admin/storage/amenities (add new amenity)
