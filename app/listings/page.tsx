/** biome-ignore-all lint/suspicious/noArrayIndexKey: valid */

"use client";

import { Icon } from "@iconify/react";
import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  LoadingOverlay,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import SearchFilters from "@/components/listing/SearchFilters";
import type { ListingSearchParams } from "@/lib/api/listings";
import { useListings } from "@/lib/hooks/useListings";

export default function ListingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<ListingSearchParams>({});
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: listings,
    isLoading,
    error,
  } = useListings({
    ...filters,
    search: searchTerm,
    limit: 12,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFiltersChange = (newFilters: ListingSearchParams) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const sortOptions = [
    { value: "price", label: "Price: Low to High" },
    { value: "area", label: "Area: Small to Large" },
    { value: "newest", label: "Newest First" },
  ];

  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Title order={1} className="text-center mb-8">
          Browse Storage Spaces
        </Title>

        {/* Search Bar */}
        <div className="mb-8">
          <TextInput
            size="lg"
            placeholder="Search by title, description, or location..."
            leftSection={<Icon icon="mdi:magnify" width={20} />}
            value={searchTerm}
            onChange={(event) => handleSearch(event.currentTarget.value)}
            rightSection={
              <Button
                variant="subtle"
                onClick={() => setShowFilters(!showFilters)}
                leftSection={<Icon icon="mdi:filter-variant" width={16} />}
              >
                Filters
              </Button>
            }
          />
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card shadow="sm" p="md" withBorder>
              <div className="flex justify-between items-center mb-4">
                <Text size="lg" fw={500}>
                  Search Filters
                </Text>
                <Button
                  variant="subtle"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  leftSection={<Icon icon="mdi:close" width={16} />}
                >
                  Close
                </Button>
              </div>
              <SearchFilters
                onFiltersChange={handleFiltersChange}
                onReset={handleResetFilters}
              />
            </Card>
          </motion.div>
        )}

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <Text size="sm" c="dimmed">
            {isLoading
              ? "Searching..."
              : `Found ${listings?.length || 0} spaces`}
          </Text>
          <div className="flex items-center gap-4">
            <Select
              placeholder="Sort by"
              data={sortOptions}
              value={sortBy}
              onChange={(value) => setSortBy(value || "")}
              w={150}
            />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Card shadow="sm" p="md" withBorder className="mb-6">
            <Text c="red" ta="center">
              Failed to load listings. Please try again.
            </Text>
          </Card>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="relative">
            <LoadingOverlay visible />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={`listing-${index}`} shadow="sm" p="md" withBorder>
                  <div className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Listings Grid */
          <Grid>
            {listings?.map((listing) => (
              <Grid.Col
                key={listing._id?.toString()}
                span={{ base: 12, md: 6, lg: 4 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    shadow="sm"
                    p="md"
                    withBorder
                    component="a"
                    href={`/listings/${listing._id}`}
                    className="group cursor-pointer h-full"
                  >
                    {/* Listing Image */}
                    <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                      {listing.images && listing.images.length > 0 ? (
                        <Image
                          src={
                            listing.images.find((img) => img.isThumbnail)
                              ?.url || listing.images[0].url
                          }
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          width={400}
                          height={192}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Icon
                            icon="mdi:image"
                            width={48}
                            className="text-gray-400"
                          />
                        </div>
                      )}

                      {/* Availability Badge */}
                      {!listing.isAvailable && (
                        <div className="absolute top-2 right-2">
                          <Badge color="red" variant="filled">
                            Unavailable
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Listing Content */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <Text size="lg" fw={600} className="line-clamp-2">
                          {listing.title}
                        </Text>
                        <Badge color="blue" variant="light">
                          {listing.storageType?.replace("_", " ").toUpperCase()}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Icon icon="mdi:map-marker" width={16} />
                        <Text size="sm">
                          {listing.location?.city}, {listing.location?.state}
                        </Text>
                      </div>

                      <div className="flex items-center justify-between">
                        <Text size="xl" fw={700} c="blue">
                          ₹{listing.price?.value?.toLocaleString("en-IN")}
                          <Text size="sm" c="dimmed" inherit>
                            /{listing.price?.basis}
                          </Text>
                        </Text>

                        <div className="flex items-center gap-1 text-gray-600">
                          <Icon icon="mdi:ruler" width={16} />
                          <Text size="sm">{listing.area} sq ft</Text>
                        </div>
                      </div>

                      {/* Key Features */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {listing.climateControlled && (
                          <Badge color="blue" variant="light" size="sm">
                            Climate Controlled
                          </Badge>
                        )}
                        {listing.driveUpAccess && (
                          <Badge color="green" variant="light" size="sm">
                            Drive-up Access
                          </Badge>
                        )}
                        {listing.accessHours.type === "24_7" && (
                          <Badge color="orange" variant="light" size="sm">
                            24/7 Access
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        )}

        {/* No Results State */}
        {!isLoading && listings && listings.length === 0 && (
          <Card shadow="sm" p="xl" withBorder className="text-center">
            <div className="space-y-4">
              <Icon
                icon="mdi:package-variant-closed"
                width={64}
                className="text-gray-400 mx-auto"
              />
              <Title order={3} c="dimmed">
                No spaces found
              </Title>
              <Text c="dimmed" size="lg">
                Try adjusting your search criteria or filters to find the
                perfect storage space.
              </Text>
              <Group justify="center" mt="md">
                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                  leftSection={<Icon icon="mdi:refresh" width={16} />}
                >
                  Clear Filters
                </Button>
                <Button
                  component="a"
                  href="/listings/new"
                  leftSection={<Icon icon="mdi:plus" width={16} />}
                >
                  List Your Space
                </Button>
              </Group>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
