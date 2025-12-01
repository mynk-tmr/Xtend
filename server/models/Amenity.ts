import { ObjectId } from "mongodb";
import { z } from "zod/v4";
import { db } from "@/lib/db";
import {
  AmenityCategorySchema,
  type AmenityCategorySchemaTypes,
} from "@/server/validation/+others";

// Zod schema for Amenity validation
export const AmenitySchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string().min(1),
  category: AmenityCategorySchema,
  icon: z.string().min(1), // Icon identifier
  description: z.string().min(1),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

// TypeScript type derived from schema
export type Amenity = z.infer<typeof AmenitySchema>;

// Collection name
export const AMENITY_COLLECTION = "amenities";

// Helper functions for Amenity operations
export const AmenityCollection = () =>
  db.collection<Amenity>(AMENITY_COLLECTION);

// Create a new amenity
export async function createAmenity(
  amenityData: Omit<Amenity, "_id" | "createdAt" | "updatedAt">,
): Promise<Amenity> {
  const amenity = {
    ...amenityData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await AmenityCollection().insertOne(amenity);
  return { ...amenity, _id: result.insertedId };
}

// Find amenity by ID
export async function findAmenityById(id: string): Promise<Amenity | null> {
  const amenity = await AmenityCollection().findOne({ _id: new ObjectId(id) });
  return amenity;
}

// Find all amenities with optional filters
export async function findAllAmenities(
  filters: Partial<Omit<Amenity, "_id" | "createdAt" | "updatedAt">> = {},
  limit: number = 50,
  skip: number = 0,
): Promise<Amenity[]> {
  const amenities = await AmenityCollection()
    .find(filters)
    .limit(limit)
    .skip(skip)
    .toArray();
  return amenities;
}

// Find amenities by category
export async function findAmenitiesByCategory(
  category: string,
  limit: number = 50,
  skip: number = 0,
): Promise<Amenity[]> {
  const amenities = await AmenityCollection()
    .find({ category: category as AmenityCategorySchemaTypes })
    .limit(limit)
    .skip(skip)
    .toArray();
  return amenities;
}

// Update amenity
export async function updateAmenity(
  id: string,
  updateData: Partial<Omit<Amenity, "_id" | "createdAt">>,
): Promise<Amenity | null> {
  const result = await AmenityCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updateData, updatedAt: new Date() } },
  );

  if (result.matchedCount === 0) return null;
  return findAmenityById(id);
}

// Delete amenity
export async function deleteAmenity(id: string): Promise<boolean> {
  const result = await AmenityCollection().deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

// Search amenities by text
export async function searchAmenities(
  searchText: string,
  limit: number = 10,
  skip: number = 0,
): Promise<Amenity[]> {
  const amenities = await AmenityCollection()
    .find({
      $or: [
        { name: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
      ],
    })
    .limit(limit)
    .skip(skip)
    .toArray();
  return amenities;
}

// Predefined amenities data
export const PREDEFINED_AMENITIES = {
  security: [
    {
      name: "24/7 CCTV Surveillance",
      icon: "mdi:cctv",
      description: "Continuous video surveillance",
    },
    {
      name: "Individual Unit Alarms",
      icon: "mdi:alarm-bell",
      description: "Alarm system for each storage unit",
    },
    {
      name: "Security Personnel",
      icon: "mdi:shield-account",
      description: "On-site security staff",
    },
    {
      name: "Gated Access",
      icon: "mdi:gate",
      description: "Secure gated entry",
    },
    {
      name: "Keypad Entry",
      icon: "mdi:numeric",
      description: "Code-based access control",
    },
    {
      name: "Biometric Access",
      icon: "mdi:fingerprint",
      description: "Fingerprint or facial recognition",
    },
    {
      name: "Motion Sensors",
      icon: "mdi:motion-sensor",
      description: "Motion detection sensors",
    },
    {
      name: "Security Patrol",
      icon: "mdi:security",
      description: "Regular security patrols",
    },
  ],
  convenience: [
    {
      name: "Loading Dock",
      icon: "mdi:forklift",
      description: "Dedicated loading area",
    },
    {
      name: "Elevator Access",
      icon: "mdi:elevator",
      description: "Elevator for multi-floor access",
    },
    {
      name: "Moving Carts Available",
      icon: "mdi:cart",
      description: "Carts for moving items",
    },
    {
      name: "Drive-up Access",
      icon: "mdi:car",
      description: "Direct vehicle access to units",
    },
    {
      name: "Forklift Service",
      icon: "mdi:forklift",
      description: "Forklift available for heavy items",
    },
    {
      name: "Package Acceptance",
      icon: "mdi:package-variant",
      description: "Accept packages on your behalf",
    },
    {
      name: "Online Account Management",
      icon: "mdi:account-cog",
      description: "Manage account online",
    },
    {
      name: "Mobile App Access",
      icon: "mdi:cellphone",
      description: "Access via mobile application",
    },
  ],
  specialized: [
    {
      name: "Climate Control",
      icon: "mdi:thermostat",
      description: "Temperature and humidity control",
    },
    {
      name: "Humidity Control",
      icon: "mdi:water-percent",
      description: "Controlled humidity levels",
    },
    {
      name: "Temperature Monitoring",
      icon: "mdi:thermometer",
      description: "24/7 temperature monitoring",
    },
    {
      name: "Pest Control",
      icon: "mdi:bug",
      description: "Regular pest control service",
    },
    {
      name: "Fire Suppression System",
      icon: "mdi:fire-extinguisher",
      description: "Automatic fire suppression",
    },
    {
      name: "Ventilation System",
      icon: "mdi:fan",
      description: "Air circulation system",
    },
    {
      name: "Air Filtration",
      icon: "mdi:air-filter",
      description: "Air quality filtration",
    },
    {
      name: "Backup Power Generator",
      icon: "mdi:power",
      description: "Backup power supply",
    },
  ],
  service: [
    {
      name: "Insurance Available",
      icon: "mdi:shield-check",
      description: "Storage insurance options",
    },
    {
      name: "Online Bill Pay",
      icon: "mdi:credit-card",
      description: "Online payment system",
    },
    {
      name: "Month-to-Month Leases",
      icon: "mdi:calendar-month",
      description: "Flexible monthly leasing",
    },
    {
      name: "Moving Supplies",
      icon: "mdi:package-variant-closed",
      description: "Moving supplies for sale",
    },
    {
      name: "Truck Rental",
      icon: "mdi:truck",
      description: "Truck rental service",
    },
    {
      name: "Concierge Service",
      icon: "mdi:human-male-board",
      description: "Personal assistance service",
    },
    {
      name: "Mail Forwarding",
      icon: "mdi:mailbox",
      description: "Mail forwarding service",
    },
    {
      name: "Inventory Management",
      icon: "mdi:clipboard-list",
      description: "Inventory tracking system",
    },
  ],
};

// Initialize predefined amenities in database
export async function initializePredefinedAmenities(): Promise<void> {
  const existingAmenities = await findAllAmenities({}, 1000, 0);

  if (existingAmenities.length === 0) {
    const amenitiesToInsert: Omit<Amenity, "_id">[] = [];

    Object.entries(PREDEFINED_AMENITIES).forEach(([category, amenities]) => {
      amenities.forEach((amenity) => {
        amenitiesToInsert.push({
          name: amenity.name,
          category: category as AmenityCategorySchemaTypes,
          icon: amenity.icon,
          description: amenity.description,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });

    if (amenitiesToInsert.length > 0) {
      await AmenityCollection().insertMany(amenitiesToInsert);
    }
  }
}
