"use client";

import { Icon } from "@iconify/react";
import { Badge, Card, Text, Title } from "@mantine/core";
import { motion } from "motion/react";
import type { ClientBooking } from "@/types";

interface BookingListProps {
  bookings: ClientBooking[];
  title: string;
  emptyMessage: string;
}

export default function BookingList({
  bookings,
  title,
  emptyMessage,
}: BookingListProps) {
  return (
    <Card shadow="sm" p="md" withBorder>
      <div className="flex justify-between items-center mb-4">
        <Title order={3}>{title}</Title>
        <Badge size="lg" color="blue" variant="light">
          {bookings.length}
        </Badge>
      </div>

      <div className="space-y-4">
        {bookings.length === 0 ? (
          <div className="text-center py-8">
            <Icon
              icon="mdi:inbox"
              width={48}
              className="text-gray-400 mx-auto mb-4"
            />
            <Text size="lg" c="dimmed">
              {emptyMessage}
            </Text>
          </div>
        ) : (
          bookings.map((booking) => (
            <motion.div
              key={booking._id?.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <Card shadow="sm" p="md" withBorder>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Text size="lg" fw={600}>
                      Booking for: {booking.listingId?.toString()}
                    </Text>

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
                  </div>

                  <div className="text-right">
                    <Text size="sm" c="dimmed">
                      {booking.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString()
                        : ""}
                    </Text>
                  </div>
                </div>

                <div className="mt-2">
                  <Text size="sm" c="dimmed" className="line-clamp-2">
                    {booking.totalAmount
                      ? `Total: $${booking.totalAmount}`
                      : ""}
                  </Text>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
}
