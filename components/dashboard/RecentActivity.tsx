"use client";

import { Icon } from "@iconify/react";
import { Badge, Card, Text, Title } from "@mantine/core";
import { motion } from "motion/react";
import type { ClientBooking, ClientListing } from "@/types";

interface RecentActivityProps {
  listings: ClientListing[];
  bookings: ClientBooking[];
  bookingRequests: ClientBooking[];
}

export default function RecentActivity({
  listings,
  bookings,
  bookingRequests,
}: RecentActivityProps) {
  const recentListings = listings?.slice(0, 3) || [];
  const recentBookings = bookings?.slice(0, 3) || [];
  const recentRequests = bookingRequests?.slice(0, 3) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Card shadow="sm" p="md" withBorder>
        <div className="flex justify-between items-center mb-4">
          <Title order={3} className="text-gray-900">
            Recent Activity
          </Title>
        </div>

        <div className="space-y-6">
          {/* Recent Listings */}
          {recentListings.length > 0 && (
            <div>
              <Text size="sm" fw={500} c="dimmed" className="mb-2">
                Recent Listings
              </Text>
              <div className="space-y-3">
                {recentListings.map((listing) => (
                  <div
                    key={listing._id?.toString()}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Icon
                        icon="mdi:package-variant"
                        width={24}
                        className="text-gray-400"
                      />
                    </div>
                    <div className="flex-1">
                      <Text size="sm" fw={500}>
                        {listing.title}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {listing.location?.city}, {listing.location?.state}
                      </Text>
                      <Badge color="blue" variant="light" size="sm">
                        {listing.storageType?.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Bookings */}
          {recentBookings.length > 0 && (
            <div>
              <Text size="sm" fw={500} c="dimmed" className="mb-2">
                Recent Bookings
              </Text>
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div
                    key={booking._id?.toString()}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Icon
                        icon="mdi:calendar-check"
                        width={24}
                        className="text-gray-400"
                      />
                    </div>
                    <div className="flex-1">
                      <Text size="sm" fw={500}>
                        Booking Request
                      </Text>
                      <Text size="xs" c="dimmed">
                        Status:{" "}
                        <Badge
                          color={
                            booking.status === "approved"
                              ? "green"
                              : booking.status === "rejected"
                                ? "red"
                                : "yellow"
                          }
                          variant="light"
                          size="sm"
                        >
                          {booking.status?.toUpperCase()}
                        </Badge>
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Requests */}
          {recentRequests.length > 0 && (
            <div>
              <Text size="sm" fw={500} c="dimmed" className="mb-2">
                Booking Requests
              </Text>
              <div className="space-y-3">
                {recentRequests.map((booking) => (
                  <div
                    key={booking._id?.toString()}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Icon
                        icon="mdi:bell-ring"
                        width={24}
                        className="text-gray-400"
                      />
                    </div>
                    <div className="flex-1">
                      <Text size="sm" fw={500}>
                        New Booking Request
                      </Text>
                      <Text size="xs" c="dimmed">
                        From: {new Date(booking.createdAt).toLocaleDateString()}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Activity */}
          {recentListings.length === 0 &&
            recentBookings.length === 0 &&
            recentRequests.length === 0 && (
              <div className="text-center py-8">
                <Icon
                  icon="mdi:inbox"
                  width={48}
                  className="text-gray-400 mx-auto"
                />
                <Text size="lg" c="dimmed" className="mt-4">
                  No recent activity
                </Text>
                <Text size="sm" c="dimmed">
                  Your listings, bookings, and booking requests will appear here
                  once you have activity.
                </Text>
              </div>
            )}
        </div>
      </Card>
    </motion.div>
  );
}
