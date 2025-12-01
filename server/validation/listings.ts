import { z } from "zod/v4";
import {
  AccessHoursSchema,
  ImageSchema,
  LocationSchema,
  PriceSchema,
  StorageTypeSchema,
} from "./+others";

// Create listing schema with optional fields for different storage types
export const schemaCreateListing = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: PriceSchema,
  location: LocationSchema,
  storageType: StorageTypeSchema,
  area: z.number().positive(),
  height: z.number().positive(),
  loadingCapacity: z.number().positive().optional(),
  accessHours: AccessHoursSchema,
  amenities: z.array(z.string()), // Will be converted to ObjectIds
  images: z.array(ImageSchema).optional(),
  isAvailable: z.boolean().default(true),

  // Self Storage fields
  unitNumber: z.string().optional(),
  floorLevel: z.number().int().positive().optional(),
  unitSize: z.enum(["small", "medium", "large", "extra_large"]).optional(),
  driveUpAccess: z.boolean().optional(),

  // Warehouse fields
  warehouseSize: z.enum(["small", "medium", "large"]).optional(),
  dockDoors: z.number().int().nonnegative().optional(),
  officeSpace: z.number().nonnegative().optional(),
  ceilingHeight: z.number().positive().optional(),
  sprinklerSystem: z.boolean().optional(),
  forkliftAvailable: z.boolean().optional(),
  truckAccess: z.boolean().optional(),

  // Commercial fields
  businessType: z
    .enum(["retail", "restaurant", "office", "pharmacy", "other"])
    .optional(),
  shelvingIncluded: z.boolean().optional(),
  displayArea: z.boolean().optional(),
  customerAccess: z.boolean().optional(),
  loadingDock: z.boolean().optional(),

  // Vehicle fields
  vehicleType: z.enum(["car", "rv", "boat", "motorcycle", "fleet"]).optional(),
  coveredParking: z.boolean().optional(),
  securityGuard: z.boolean().optional(),
  washBay: z.boolean().optional(),
  maintenanceArea: z.boolean().optional(),
  chargingStation: z.boolean().optional(),

  // Specialized fields
  specialtyType: z
    .enum(["wine", "art", "antique", "electronics", "documents"])
    .optional(),
  temperatureRange: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .optional(),
  humidityControl: z.boolean().optional(),
  lightControl: z.boolean().optional(),
  vibrationControl: z.boolean().optional(),
  airQualityControl: z.boolean().optional(),

  // Workshop fields
  workshopType: z
    .enum(["woodworking", "auto", "art", "maker", "general"])
    .optional(),
  ventilationSystem: z.boolean().optional(),
  powerSupply: z.number().positive().optional(),
  workbenches: z.boolean().optional(),
  toolStorage: z.boolean().optional(),
  soundProofing: z.boolean().optional(),

  // Coworking fields
  spaceType: z.enum(["hybrid", "flexible", "popup"]).optional(),
  meetingRooms: z.boolean().optional(),
  wifiIncluded: z.boolean().optional(),
  kitchenAccess: z.boolean().optional(),
  receptionService: z.boolean().optional(),

  // Agricultural fields
  agricultureType: z
    .enum(["grain", "equipment", "produce", "livestock", "other"])
    .optional(),
  drainageSystem: z.boolean().optional(),
  loadingEquipment: z.boolean().optional(),

  // Common fields
  climateControlled: z.boolean().optional(),
  individualAlarm: z.boolean().optional(),
  pestControl: z.boolean().optional(),
});

// Update schema (partial version of create schema)
export const schemaUpdateListing = schemaCreateListing.partial();

// Search parameters schema
export const schemaSearchParams = z.object({
  search: z.string().optional(),
  limit: z.coerce.number().optional(),
  skip: z.coerce.number().optional(),
  storageType: StorageTypeSchema.optional(),
  areaRange: z
    .object({
      min: z.number().positive().optional(),
      max: z.number().positive().optional(),
    })
    .optional(),
  accessType: z
    .enum(["24_7", "business_hours", "restricted", "weekends"])
    .optional(),
  amenities: z.array(z.string()).optional(),
  temperatureControlled: z.boolean().optional(),
  climateControlled: z.boolean().optional(),
  vehicleType: z
    .enum(["car", "rv", "boat", "motorcycle", "fleet"])
    .array()
    .optional(),
  businessType: z
    .enum(["retail", "restaurant", "office", "pharmacy", "other"])
    .array()
    .optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  priceRange: z
    .object({
      min: z.number().positive().optional(),
      max: z.number().positive().optional(),
    })
    .optional(),
  priceBasis: z.enum(["month", "day", "week"]).optional(),
  sortBy: z.enum(["price", "area", "newest", "rating"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});
