"use client";

import { Icon } from "@iconify/react";
import { Badge, Button, Card, Group, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useListing } from "@/lib/hooks/useListings";

interface ListingDetailsProps {
  listingId: string;
}

export default function ListingDetails({ listingId }: ListingDetailsProps) {
  const router = useRouter();
  const { data: listing, isLoading, error } = useListing(listingId);

  const handleContactOwner = () => {
    notifications.show({
      title: "Contact Request Sent",
      message: "Your contact information has been sent to the property owner.",
      color: "green",
    });
  };

  const handleBookNow = () => {
    router.push(`/bookings/new?listingId=${listingId}` as any);
  };

  const handleShortlist = () => {
    notifications.show({
      title: "Added to Shortlist",
      message: "This property has been added to your shortlist.",
      color: "green",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card shadow="sm" p="xl" withBorder className="max-w-2xl mx-4">
          <div className="text-center">
            <Icon
              icon="mdi:alert-circle"
              width={64}
              className="text-red-500 mx-auto mb-4"
            />
            <Title order={2} c="red">
              Listing Not Found
            </Title>
            <Text c="dimmed">
              The listing you're looking for doesn't exist or has been removed.
            </Text>
            <Group justify="center" mt="md">
              <Button
                variant="outline"
                onClick={() => router.push("/listings")}
              >
                Back to Listings
              </Button>
            </Group>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Group mb="md" c="dimmed">
          <Button
            variant="subtle"
            size="sm"
            onClick={() => router.push("/listings")}
            leftSection={<Icon icon="mdi:arrow-left" width={16} />}
          >
            Back to Listings
          </Button>
          <Text size="sm">/</Text>
          <Text size="sm">Listing Details</Text>
        </Group>

        {/* Listing Details */}
        <Card shadow="md" p="xl" withBorder className="mb-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <Title order={1} className="mb-2">
                {listing.title}
              </Title>
              <div className="flex items-center gap-3">
                <Badge color="blue" variant="light" size="lg">
                  {listing.storageType?.replace("_", " ").toUpperCase()}
                </Badge>
                {!listing.isAvailable && (
                  <Badge color="red" variant="filled" ml="sm">
                    Unavailable
                  </Badge>
                )}
              </div>
            </div>

            <div className="text-right">
              <Text size="xl" fw={700} c="blue">
                ₹{listing.price?.value?.toLocaleString("en-IN")}
                <Text size="sm" c="dimmed" inherit>
                  /{listing.price?.basis}
                </Text>
              </Text>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative h-96 mb-6 overflow-hidden rounded-lg">
            {listing.images && listing.images.length > 0 ? (
              <div className="relative h-full">
                <Image
                  src={
                    listing.images.find((img: any) => img.isThumbnail)?.url ||
                    listing.images[0].url
                  }
                  alt={listing.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                />

                {/* Image Thumbnails */}
                <div className="absolute bottom-4 left-1/2 right-1/2 flex gap-2">
                  {listing.images.map((image) => (
                    <button
                      type="button"
                      key={image.public_id}
                      onClick={() => {
                        // In a real implementation, you would show the clicked image as main
                        console.log("Image clicked:", image);
                      }}
                      className={`relative w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                        image.isThumbnail
                          ? "border-blue-500 ring-2 ring-blue-500"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={listing.title}
                        fill
                        className="object-cover"
                        sizes="50px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Icon icon="mdi:image" width={64} className="text-gray-400" />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <Title order={3} className="mb-3">
              Description
            </Title>
            <Text size="lg" className="leading-relaxed">
              {listing.description}
            </Text>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Title order={4} className="mb-3">
                Location
              </Title>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Icon icon="mdi:map-marker" width={16} />
                  <Text size="sm">
                    {listing.location?.address}, {listing.location?.city},{" "}
                    {listing.location?.state}
                  </Text>
                </div>
              </div>
            </div>

            <div>
              <Title order={4} className="mb-3">
                Space Details
              </Title>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Text size="sm" c="dimmed">
                    Area:
                  </Text>
                  <Text size="sm" fw={500}>
                    {listing.area} sq ft
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text size="sm" c="dimmed">
                    Height:
                  </Text>
                  <Text size="sm" fw={500}>
                    {listing.height} ft
                  </Text>
                </div>
                {listing.loadingCapacity && (
                  <div className="flex justify-between">
                    <Text size="sm" c="dimmed">
                      Loading Capacity:
                    </Text>
                    <Text size="sm" fw={500}>
                      {listing.loadingCapacity} kg/tons
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Access Information */}
          <div className="mb-6">
            <Title order={3} className="mb-3">
              Access Information
            </Title>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:clock" width={16} />
                <Text size="sm">
                  {listing.accessHours?.type?.replace("_", " ").toUpperCase()}
                </Text>
              </div>
              {listing.accessHours?.description && (
                <Text size="sm" c="dimmed">
                  {listing.accessHours.description}
                </Text>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <Title order={3} className="mb-3">
              Features & Amenities
            </Title>
            <div className="flex flex-wrap gap-2">
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

        {/* Action Buttons */}
        <Card shadow="sm" p="md" withBorder>
          <Group justify="space-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleShortlist}
                leftSection={<Icon icon="mdi:heart" width={16} />}
                disabled={!listing.isAvailable}
              >
                {listing.isAvailable ? "Add to Shortlist" : "Unavailable"}
              </Button>

              <Button
                variant="outline"
                onClick={handleContactOwner}
                leftSection={<Icon icon="mdi:message" width={16} />}
                disabled={!listing.isAvailable}
              >
                Contact Owner
              </Button>
            </div>

            <Button
              size="lg"
              onClick={handleBookNow}
              leftSection={<Icon icon="mdi:calendar-check" width={16} />}
              disabled={!listing.isAvailable}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {listing.isAvailable ? "Book Now" : "Unavailable"}
            </Button>
          </Group>
        </Card>
      </div>
    </div>
  );
}
