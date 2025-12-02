import { z } from "zod/v4";

// Image schema
export const ImageSchema = z.object({
  url: z.url(),
  isThumbnail: z.boolean(),
  public_id: z.url(),
});

// Location schema
export const LocationSchema = z.object({
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export const PropertyTypeSchema = z.enum([
  "self_storage",
  "warehouse",
  "commercial",
  "vehicle",
  "specialized",
  "workshop",
  "coworking",
  "agricultural",
]);

// Storage Type specific schemas
export const StorageTypeSchema = z.enum([
  "self_storage",
  "warehouse",
  "commercial",
  "vehicle",
  "specialized",
  "workshop",
  "coworking",
  "agricultural",
]);

// Access Hours Schema
export const AccessHoursSchema = z.object({
  type: z.enum(["24_7", "business_hours", "restricted", "weekends"]),
  description: z.string().optional(),
});

// Price Schema
export const PriceSchema = z.object({
  value: z.number().positive(),
  basis: z.enum(["month", "day", "week"]),
});

// Amenity Category Schema
export const AmenityCategorySchema = z.enum([
  "security",
  "convenience",
  "specialized",
  "service",
]);

// Self Storage Unit Details Schema
export const SelfStorageUnitDetailsSchema = z.object({
  unitNumber: z.string(),
  floorLevel: z.number().int().positive(),
  unitSize: z.enum(["small", "medium", "large", "extra_large"]),
  individualAlarm: z.boolean(),
});

// Warehouse Unit Details Schema
export const WarehouseUnitDetailsSchema = z.object({
  warehouseSize: z.enum(["small", "medium", "large"]),
  dockDoors: z.number().int().nonnegative(),
  officeSpace: z.number().nonnegative(),
  ceilingHeight: z.number().positive(),
  sprinklerSystem: z.boolean(),
  forkliftAvailable: z.boolean(),
  truckAccess: z.boolean(),
});

// Commercial Unit Details Schema
export const CommercialUnitDetailsSchema = z.object({
  businessType: z.enum(["retail", "restaurant", "office", "pharmacy", "other"]),
  shelvingIncluded: z.boolean(),
  displayArea: z.boolean(),
  customerAccess: z.boolean(),
  loadingDock: z.boolean(),
  climateControlled: z.boolean(),
});

// Vehicle Unit Details Schema
export const VehicleUnitDetailsSchema = z.object({
  vehicleType: z.enum(["car", "rv", "boat", "motorcycle", "fleet"]),
  coveredParking: z.boolean(),
  securityGuard: z.boolean(),
  washBay: z.boolean(),
  maintenanceArea: z.boolean(),
  chargingStation: z.boolean(),
});

// Specialized Unit Details Schema
export const SpecializedUnitDetailsSchema = z.object({
  specialtyType: z.enum(["wine", "art", "antique", "electronics", "documents"]),
  temperatureRange: z.object({
    min: z.number(),
    max: z.number(),
  }),
  humidityControl: z.boolean(),
  lightControl: z.boolean(),
  vibrationControl: z.boolean(),
  airQualityControl: z.boolean(),
});

// Workshop Unit Details Schema
export const WorkshopUnitDetailsSchema = z.object({
  workshopType: z.enum(["woodworking", "auto", "art", "maker", "general"]),
  ventilationSystem: z.boolean(),
  powerSupply: z.number().positive(),
  workbenches: z.boolean(),
  toolStorage: z.boolean(),
  soundProofing: z.boolean(),
});

// Coworking Unit Details Schema
export const CoworkingUnitDetailsSchema = z.object({
  spaceType: z.enum(["hybrid", "flexible", "popup"]),
  officeSpace: z.number().nonnegative(),
  meetingRooms: z.boolean(),
  wifiIncluded: z.boolean(),
  kitchenAccess: z.boolean(),
  receptionService: z.boolean(),
});

// Agricultural Unit Details Schema
export const AgriculturalUnitDetailsSchema = z.object({
  agricultureType: z.enum([
    "grain",
    "equipment",
    "produce",
    "livestock",
    "other",
  ]),
  temperatureControlled: z.boolean(),
  ventilationSystem: z.boolean(),
  pestControl: z.boolean(),
  drainageSystem: z.boolean(),
  loadingEquipment: z.boolean(),
});

export const BookingStatusSchema = z.enum([
  "pending",
  "approved",
  "rejected",
  "cancelled",
]);

export const ComplaintStatusSchema = z.enum([
  "open",
  "investigating",
  "resolved",
  "dismissed",
]);

export const UserRoleSchema = z.enum(["user", "admin"]);

//types
export type PropertyTypeSchemaTypes = z.output<typeof PropertyTypeSchema>;
export type StorageTypeSchemaTypes = z.output<typeof StorageTypeSchema>;
export type AmenityCategorySchemaTypes = z.output<typeof AmenityCategorySchema>;
export type AccessHoursSchemaTypes = z.output<typeof AccessHoursSchema>;
export type PriceSchemaTypes = z.output<typeof PriceSchema>;

// Storage type specific types
export type SelfStorageUnitDetailsTypes = z.output<
  typeof SelfStorageUnitDetailsSchema
>;
export type WarehouseUnitDetailsTypes = z.output<
  typeof WarehouseUnitDetailsSchema
>;
export type CommercialUnitDetailsTypes = z.output<
  typeof CommercialUnitDetailsSchema
>;
export type VehicleUnitDetailsTypes = z.output<typeof VehicleUnitDetailsSchema>;
export type SpecializedUnitDetailsTypes = z.output<
  typeof SpecializedUnitDetailsSchema
>;
export type WorkshopUnitDetailsTypes = z.output<
  typeof WorkshopUnitDetailsSchema
>;
export type CoworkingUnitDetailsTypes = z.output<
  typeof CoworkingUnitDetailsSchema
>;
export type AgriculturalUnitDetailsTypes = z.output<
  typeof AgriculturalUnitDetailsSchema
>;
