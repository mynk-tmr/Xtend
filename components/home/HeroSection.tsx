/** biome-ignore-all lint/suspicious/noExplicitAny: later refactor */
"use client";

import { Icon } from "@iconify/react";
import { Button, NumberInput, Select, TextInput } from "@mantine/core";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import type { PropertyTypeSchemaTypes } from "@/types/shared/validation";

/* -----------------------------
   Constants
------------------------------*/
const propertyTypes = [
  { value: "", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "studio", label: "Studio" },
  { value: "condo", label: "Condo" },
  { value: "other", label: "Other" },
];

const popularCities = [
  "Mumbai",
  "Bangalore",
  "Delhi",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

/* -----------------------------
   Search Form Component
------------------------------*/
function SearchForm({
  searchParams,
  setSearchParams,
  onSearch,
}: {
  searchParams: {
    location: string;
    propertyType: PropertyTypeSchemaTypes | "";
    minPrice: number | undefined;
    maxPrice: number | undefined;
  };
  setSearchParams: any;
  onSearch: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full max-w-4xl mt-6 mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8"
    >
      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Location */}
        <TextInput
          placeholder="Enter location..."
          leftSection={<Icon icon="heroicons:map-pin" width={18} height={18} />}
          value={searchParams.location}
          onChange={(e) =>
            setSearchParams((prev: any) => ({
              ...prev,
              location: e.target.value,
            }))
          }
          size="md"
        />

        {/* Property Type */}
        <Select
          placeholder="Property Type"
          data={propertyTypes}
          value={searchParams.propertyType}
          onChange={(value) =>
            setSearchParams((prev: any) => ({
              ...prev,
              propertyType: value || "",
            }))
          }
          size="md"
          leftSection={
            <Icon icon="heroicons:building-office" width={18} height={18} />
          }
        />

        {/* Min & Max Price */}
        <NumberInput
          placeholder="Min Price"
          min={0}
          value={searchParams.minPrice}
          onChange={(value) =>
            setSearchParams((prev: any) => ({
              ...prev,
              minPrice: Number(value) || undefined,
            }))
          }
          size="md"
          leftSection={
            <Icon icon="heroicons:currency-rupee" width={18} height={18} />
          }
        />

        <NumberInput
          placeholder="Max Price"
          min={0}
          value={searchParams.maxPrice}
          onChange={(value) =>
            setSearchParams((prev: any) => ({
              ...prev,
              maxPrice: Number(value) || undefined,
            }))
          }
          size="md"
          leftSection={
            <Icon icon="heroicons:currency-rupee" width={18} height={18} />
          }
        />
      </div>

      {/* Search Button */}
      <Button
        size="lg"
        fullWidth
        radius="md"
        onClick={onSearch}
        rightSection={
          <Icon icon="heroicons:magnifying-glass" width={20} height={20} />
        }
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        Search Spaces
      </Button>
    </motion.div>
  );
}

/* -----------------------------
   Popular Cities
------------------------------*/
function PopularCities({ onCityClick }: { onCityClick: (c: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-8"
    >
      <p className="text-sm mb-3 text-gray-300">Popular Cities:</p>

      <div className="flex flex-wrap justify-center gap-2 px-4">
        {popularCities.map((city) => (
          <Button
            key={city}
            variant="outline"
            size="xs"
            radius="xl"
            onClick={() => onCityClick(city)}
            className="border-white/30 text-white hover:bg-white/20 hover:border-white/50"
          >
            {city}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}

/* -----------------------------
   Main Hero Section
------------------------------*/
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
];

export default function HeroSection() {
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "" as PropertyTypeSchemaTypes | "",
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
  });

  const handleSearch = () => {
    console.log("Search with:", searchParams);
  };

  return (
    <section className="relative py-10 min-h-[90vh]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGES[0]}
          alt="Storage background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full grid place-items-center place-content-center px-4 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Find Storage Spaces Across India
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Discover warehouses, studios, and storage spaces across verified
            listings in major Indian cities.
          </p>
        </motion.div>

        {/* Search Form */}
        <SearchForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={handleSearch}
        />

        {/* Popular Cities */}
        <PopularCities
          onCityClick={(city) =>
            setSearchParams((p) => ({ ...p, location: city }))
          }
        />
      </div>
    </section>
  );
}
