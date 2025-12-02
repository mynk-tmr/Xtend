// Client-side listing types without MongoDB dependencies

export interface ClientListing {
  _id: string; // Use string instead of ObjectId
  tenantId: string; // Use string instead of ObjectId
  isAvailable: boolean;
  title: string;
  description: string;
  price: {
    value: number;
    basis: "month" | "day" | "week";
  };
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
  storageType:
    | "self_storage"
    | "warehouse"
    | "commercial"
    | "vehicle"
    | "specialized"
    | "workshop"
    | "coworking"
    | "agricultural";
  area: number;
  height: number;
  loadingCapacity?: number;
  accessHours: {
    type: "24_7" | "business_hours" | "restricted" | "weekends";
    description?: string;
  };
  amenitiesId: string[]; // Use string array instead of ObjectId array
  images?: Array<{
    url: string;
    isThumbnail: boolean;
    public_id: string;
  }>;
  createdAt: string; // Use string instead of Date
  updatedAt: string; // Use string instead of Date

  // Storage type specific fields (all optional)
  unitNumber?: string;
  floorLevel?: number;
  unitSize?: "small" | "medium" | "large" | "extra_large";
  individualAlarm?: boolean;
  warehouseSize?: "small" | "medium" | "large";
  dockDoors?: number;
  officeSpace?: number;
  ceilingHeight?: number;
  sprinklerSystem?: boolean;
  forkliftAvailable?: boolean;
  truckAccess?: boolean;
  businessType?: "retail" | "restaurant" | "office" | "pharmacy" | "other";
  shelvingIncluded?: boolean;
  displayArea?: boolean;
  customerAccess?: boolean;
  loadingDock?: boolean;
  climateControlled?: boolean;
  vehicleType?: "car" | "rv" | "boat" | "motorcycle" | "fleet";
  coveredParking?: boolean;
  securityGuard?: boolean;
  washBay?: boolean;
  maintenanceArea?: boolean;
  chargingStation?: boolean;
  specialtyType?: "wine" | "art" | "antique" | "electronics" | "documents";
  temperatureRange?: {
    min: number;
    max: number;
  };
  humidityControl?: boolean;
  lightControl?: boolean;
  vibrationControl?: boolean;
  airQualityControl?: boolean;
  workshopType?: "woodworking" | "auto" | "art" | "maker" | "general";
  ventilationSystem?: boolean;
  powerSupply?: number;
  workbenches?: boolean;
  toolStorage?: boolean;
  soundProofing?: boolean;
  spaceType?: "hybrid" | "flexible" | "popup";
  meetingRooms?: boolean;
  wifiIncluded?: boolean;
  kitchenAccess?: boolean;
  receptionService?: boolean;
  agricultureType?: "grain" | "equipment" | "produce" | "livestock" | "other";
  temperatureControlled?: boolean;
  pestControl?: boolean;
  drainageSystem?: boolean;
  loadingEquipment?: boolean;
}

export interface CreateListingData {
  isAvailable: boolean;
  title: string;
  description: string;
  price: {
    value: number;
    basis: "month" | "day" | "week";
  };
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
  storageType:
    | "self_storage"
    | "warehouse"
    | "commercial"
    | "vehicle"
    | "specialized"
    | "workshop"
    | "coworking"
    | "agricultural";
  area: number;
  height: number;
  loadingCapacity?: number;
  accessHours: {
    type: "24_7" | "business_hours" | "restricted" | "weekends";
    description?: string;
  };
  amenitiesId: string[];
  images?: Array<{
    url: string;
    isThumbnail: boolean;
    public_id: string;
  }>;

  // Storage type specific fields (all optional)
  unitNumber?: string;
  floorLevel?: number;
  unitSize?: "small" | "medium" | "large" | "extra_large";
  individualAlarm?: boolean;
  warehouseSize?: "small" | "medium" | "large";
  dockDoors?: number;
  officeSpace?: number;
  ceilingHeight?: number;
  sprinklerSystem?: boolean;
  forkliftAvailable?: boolean;
  truckAccess?: boolean;
  businessType?: "retail" | "restaurant" | "office" | "pharmacy" | "other";
  shelvingIncluded?: boolean;
  displayArea?: boolean;
  customerAccess?: boolean;
  loadingDock?: boolean;
  climateControlled?: boolean;
  vehicleType?: "car" | "rv" | "boat" | "motorcycle" | "fleet";
  coveredParking?: boolean;
  securityGuard?: boolean;
  washBay?: boolean;
  maintenanceArea?: boolean;
  chargingStation?: boolean;
  specialtyType?: "wine" | "art" | "antique" | "electronics" | "documents";
  temperatureRange?: {
    min: number;
    max: number;
  };
  humidityControl?: boolean;
  lightControl?: boolean;
  vibrationControl?: boolean;
  airQualityControl?: boolean;
  workshopType?: "woodworking" | "auto" | "art" | "maker" | "general";
  ventilationSystem?: boolean;
  powerSupply?: number;
  workbenches?: boolean;
  toolStorage?: boolean;
  soundProofing?: boolean;
  spaceType?: "hybrid" | "flexible" | "popup";
  meetingRooms?: boolean;
  wifiIncluded?: boolean;
  kitchenAccess?: boolean;
  receptionService?: boolean;
  agricultureType?: "grain" | "equipment" | "produce" | "livestock" | "other";
  temperatureControlled?: boolean;
  pestControl?: boolean;
  drainageSystem?: boolean;
  loadingEquipment?: boolean;
}

export interface UpdateListingData extends Partial<CreateListingData> {}

export interface ListingSearchParams {
  search?: string;
  limit?: number;
  skip?: number;
  storageType?:
    | "self_storage"
    | "warehouse"
    | "commercial"
    | "vehicle"
    | "specialized"
    | "workshop"
    | "coworking"
    | "agricultural";
  areaRange?: {
    min: number;
    max: number;
  };
  accessType?: {
    type: "24_7" | "business_hours" | "restricted" | "weekends";
    description?: string;
  };
  amenitiesId?: string[];
  temperatureControlled?: boolean;
  climateControlled?: boolean;
  vehicleType?: Array<"car" | "rv" | "boat" | "motorcycle" | "fleet">;
  businessType?: Array<
    "retail" | "restaurant" | "office" | "pharmacy" | "other"
  >;
  city?: string;
  state?: string;
  country?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
  priceBasis?: "month" | "day" | "week";
  sortBy?: "price" | "area" | "newest" | "rating";
  sortOrder?: "asc" | "desc";
}
