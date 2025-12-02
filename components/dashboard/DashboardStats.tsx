"use client";

import { Badge, Card, Text, Title } from "@mantine/core";
import { motion } from "motion/react";
import type { Booking } from "@/server/models/Booking";
import type { StorageListing } from "@/server/models/Listing";

interface DashboardStatsProps {
  listings: StorageListing[];
  bookings: Booking[];
  bookingRequests: Booking[];
}

export default function DashboardStats({
  listings,
  bookings,
  bookingRequests,
}: DashboardStatsProps) {
  const activeListings =
    listings?.filter((listing) => listing.isAvailable).length || 0;
  const totalBookings = bookings?.length || 0;
  const pendingBookings =
    bookings?.filter((booking) => booking.status === "pending").length || 0;
  const pendingRequests =
    bookingRequests?.filter((booking) => booking.status === "pending").length ||
    0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {/* Listings Stats */}
      <Card shadow="sm" p="md" withBorder>
        <div className="flex items-center justify-between mb-4">
          <Title order={3} className="text-gray-900">
            Your Listings
          </Title>
          <Badge size="lg" color="blue" variant="light">
            {listings?.length || 0}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {activeListings}
            </div>
            <Text size="sm" c="dimmed">
              Active Listings
            </Text>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {listings?.length || 0}
            </div>
            <Text size="sm" c="dimmed">
              Total Listings
            </Text>
          </div>
        </div>
      </Card>

      {/* Bookings Stats */}
      <Card shadow="sm" p="md" withBorder>
        <div className="flex items-center justify-between mb-4">
          <Title order={3} className="text-gray-900">
            Your Bookings
          </Title>
          <Badge size="lg" color="green" variant="light">
            {totalBookings}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {pendingBookings}
            </div>
            <Text size="sm" c="dimmed">
              Pending Bookings
            </Text>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {totalBookings}
            </div>
            <Text size="sm" c="dimmed">
              Total Bookings
            </Text>
          </div>
        </div>
      </Card>

      {/* Booking Requests Stats */}
      <Card shadow="sm" p="md" withBorder>
        <div className="flex items-center justify-between mb-4">
          <Title order={3} className="text-gray-900">
            Booking Requests
          </Title>
          <Badge size="lg" color="orange" variant="light">
            {pendingRequests}
          </Badge>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {pendingRequests}
          </div>
          <Text size="sm" c="dimmed">
            Pending Requests
          </Text>
        </div>
      </Card>
    </motion.div>
  );
}
