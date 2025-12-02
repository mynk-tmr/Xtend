// Client-side validation types without server dependencies

export type StorageTypeSchemaTypes =
  | "self_storage"
  | "warehouse"
  | "commercial"
  | "vehicle"
  | "specialized"
  | "workshop"
  | "coworking"
  | "agricultural";

export type PropertyTypeSchemaTypes =
  | "self_storage"
  | "warehouse"
  | "commercial"
  | "vehicle"
  | "specialized"
  | "workshop"
  | "coworking"
  | "agricultural";

export type AccessHoursSchemaTypes = {
  type: "24_7" | "business_hours" | "restricted" | "weekends";
  description?: string;
};

export type PriceSchemaTypes = {
  value: number;
  basis: "month" | "day" | "week";
};

export type AmenityCategorySchemaTypes =
  | "security"
  | "convenience"
  | "specialized"
  | "service";

// Storage type specific types
export type SelfStorageUnitDetailsTypes = {
  unitNumber?: string;
  floorLevel?: number;
  unitSize?: "small" | "medium" | "large" | "extra_large";
  individualAlarm?: boolean;
};

export type WarehouseUnitDetailsTypes = {
  warehouseSize?: "small" | "medium" | "large";
  dockDoors?: number;
  officeSpace?: number;
  ceilingHeight?: number;
  sprinklerSystem?: boolean;
  forkliftAvailable?: boolean;
  truckAccess?: boolean;
};

export type CommercialUnitDetailsTypes = {
  businessType?: "retail" | "restaurant" | "office" | "pharmacy" | "other";
  shelvingIncluded?: boolean;
  displayArea?: boolean;
  customerAccess?: boolean;
  loadingDock?: boolean;
  climateControlled?: boolean;
};

export type VehicleUnitDetailsTypes = {
  vehicleType?: "car" | "rv" | "boat" | "motorcycle" | "fleet";
  coveredParking?: boolean;
  securityGuard?: boolean;
  washBay?: boolean;
  maintenanceArea?: boolean;
  chargingStation?: boolean;
};

export type SpecializedUnitDetailsTypes = {
  specialtyType?: "wine" | "art" | "antique" | "electronics" | "documents";
  temperatureRange?: {
    min: number;
    max: number;
  };
  humidityControl?: boolean;
  lightControl?: boolean;
  vibrationControl?: boolean;
  airQualityControl?: boolean;
};

export type WorkshopUnitDetailsTypes = {
  workshopType?: "woodworking" | "auto" | "art" | "maker" | "general";
  ventilationSystem?: boolean;
  powerSupply?: number;
  workbenches?: boolean;
  toolStorage?: boolean;
  soundProofing?: boolean;
};

export type CoworkingUnitDetailsTypes = {
  spaceType?: "hybrid" | "flexible" | "popup";
  officeSpace?: number;
  meetingRooms?: boolean;
  wifiIncluded?: boolean;
  kitchenAccess?: boolean;
  receptionService?: boolean;
};

export type AgriculturalUnitDetailsTypes = {
  agricultureType?: "grain" | "equipment" | "produce" | "livestock" | "other";
  temperatureControlled?: boolean;
  ventilationSystem?: boolean;
  pestControl?: boolean;
  drainageSystem?: boolean;
  loadingEquipment?: boolean;
};

export type BookingStatusSchemaTypes =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled";

export type ComplaintStatusSchemaTypes =
  | "open"
  | "investigating"
  | "resolved"
  | "dismissed";

export type UserRoleSchemaTypes = "user" | "admin";
