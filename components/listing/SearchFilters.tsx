"use client";

import { Icon } from "@iconify/react";
import {
  Accordion,
  Button,
  Checkbox,
  MultiSelect,
  NumberInput,
  RangeSlider,
  Select,
  Text,
} from "@mantine/core";
import { useState } from "react";
import type { ListingSearchParams } from "@/lib/api/listings/calls";
import type { StorageTypeSchemaTypes } from "@/types/shared/validation";

interface SearchFiltersProps {
  onFiltersChange: (filters: ListingSearchParams) => void;
  onReset: () => void;
}

export default function SearchFilters({
  onFiltersChange,
  onReset,
}: SearchFiltersProps) {
  const MIN_INTEGER = 0;
  const MAX_INTEGER = 10_000;
  const defaultFilters = {
    storageType: null as string | null,
    areaRange: { min: MIN_INTEGER, max: MAX_INTEGER },
    priceRange: { min: MIN_INTEGER, max: MAX_INTEGER },
    climateControlled: false,
    temperatureControlled: false,
    city: "",
    state: "",
    businessType: [] as string[],
    vehicleType: [] as string[],
  };

  const [filters, setFilters] = useState(defaultFilters);

  const storageTypes: { value: StorageTypeSchemaTypes; label: string }[] = [
    { value: "self_storage", label: "Self Storage" },
    { value: "warehouse", label: "Warehouse" },
    { value: "commercial", label: "Commercial Space" },
    { value: "vehicle", label: "Vehicle Storage" },
    { value: "specialized", label: "Specialized Storage" },
    { value: "workshop", label: "Workshop" },
    { value: "coworking", label: "Co-working Space" },
    { value: "agricultural", label: "Agricultural Storage" },
  ];

  const businessTypes = [
    { value: "retail", label: "Retail" },
    { value: "restaurant", label: "Restaurant" },
    { value: "office", label: "Office" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "other", label: "Other" },
  ];

  const vehicleTypes = [
    { value: "car", label: "Car" },
    { value: "rv", label: "RV" },
    { value: "boat", label: "Boat" },
    { value: "motorcycle", label: "Motorcycle" },
    { value: "fleet", label: "Fleet" },
  ];

  const handleFilterChange = <T extends keyof typeof filters>(
    key: T,
    value: (typeof filters)[T],
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters as ListingSearchParams);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    onReset();
  };

  return (
    <div className="w-full space-y-4">
      <Accordion variant="contained" defaultValue={"basic"}>
        <Accordion.Item value="basic">
          <Accordion.Control>
            <div className="flex justify-between items-center">
              <Text size="lg" fw={500}>
                Basic Filters
              </Text>
              <Icon icon="mdi:filter-variant" width={16} />
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <div className="space-y-4 p-4">
              <Select
                label="Storage Type"
                placeholder="Select storage type"
                data={storageTypes}
                value={filters.storageType}
                onChange={(value) => handleFilterChange("storageType", value)}
                clearable
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberInput
                  label="Min Area (sq ft)"
                  placeholder="Minimum area"
                  value={filters.areaRange?.min}
                  onChange={(value) =>
                    handleFilterChange("areaRange", {
                      ...filters.areaRange,
                      min: Number(value),
                    })
                  }
                />
                <NumberInput
                  label="Max Area (sq ft)"
                  placeholder="Maximum area"
                  value={filters.areaRange?.max}
                  onChange={(value) =>
                    handleFilterChange("areaRange", {
                      ...filters.areaRange,
                      max: Number(value) || 10000,
                    })
                  }
                />
              </div>

              <div>
                <Text size="sm" fw={500} mb="xs">
                  Price Range (₹/month)
                </Text>
                <RangeSlider
                  min={0}
                  max={100000}
                  step={1000}
                  value={[
                    filters.priceRange?.min || MIN_INTEGER,
                    filters.priceRange?.max || MAX_INTEGER,
                  ]}
                  onChange={(value) =>
                    handleFilterChange("priceRange", {
                      min: value[0],
                      max: value[1],
                    })
                  }
                  marks={[
                    { value: 0, label: "₹0" },
                    { value: 25000, label: "₹25,000" },
                    { value: 50000, label: "₹50,000" },
                    { value: 75000, label: "₹75,000" },
                    { value: 100000, label: "₹100,000" },
                  ]}
                />
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="features">
          <Accordion.Control>
            <div className="flex justify-between items-center">
              <Text size="lg" fw={500}>
                Features
              </Text>
              <Icon icon="mdi:feature-search" width={16} />
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <div className="space-y-4 p-4">
              <Checkbox
                label="Climate Controlled"
                checked={filters.climateControlled}
                onChange={(event) =>
                  handleFilterChange(
                    "climateControlled",
                    event.currentTarget.checked,
                  )
                }
              />

              <Checkbox
                label="Temperature Controlled"
                checked={filters.temperatureControlled}
                onChange={(event) =>
                  handleFilterChange(
                    "temperatureControlled",
                    event.currentTarget.checked,
                  )
                }
              />

              <MultiSelect
                label="Business Type"
                placeholder="Select business type"
                data={businessTypes}
                value={filters.businessType}
                onChange={(value) => handleFilterChange("businessType", value)}
                clearable
                multiple
              />

              <MultiSelect
                label="Vehicle Type"
                placeholder="Select vehicle type"
                data={vehicleTypes}
                value={filters.vehicleType}
                onChange={(value) => handleFilterChange("vehicleType", value)}
                clearable
                multiple
              />
            </div>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="location">
          <Accordion.Control>
            <div className="flex justify-between items-center">
              <Text size="lg" fw={500}>
                Location
              </Text>
              <Icon icon="mdi:map-marker" width={16} />
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <div className="space-y-4 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Enter city"
                  value={filters.city}
                  onChange={(event) =>
                    handleFilterChange("city", event.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Enter state"
                  value={filters.state}
                  onChange={(event) =>
                    handleFilterChange("state", event.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          onClick={handleReset}
          leftSection={<Icon icon="mdi:refresh" width={16} />}
        >
          Reset Filters
        </Button>
        <Button
          onClick={() => onFiltersChange(filters as ListingSearchParams)}
          leftSection={<Icon icon="mdi:magnify" width={16} />}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
