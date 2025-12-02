"use client";

import { Icon } from "@iconify/react";
import { Grid, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import BookingRequests from "@/components/booking/BookingList";
import { getBookingRequestsOptions } from "@/lib/api/bookings/options";

export default function BookingRequestsClient() {
  const {
    data: bookingRequests,
    isLoading,
    error,
  } = useQuery(getBookingRequestsOptions());

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon
            icon="mdi:alert-circle"
            width={48}
            className="text-red-500 mx-auto"
          />
          <Title order={1} c="red" className="mt-4">
            Error Loading Booking Requests
          </Title>
          <p className="opacity-70">
            Please try refreshing page or contact support if problem persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 12, lg: 8 }}>
        <BookingRequests
          bookings={bookingRequests || []}
          title="Booking Requests"
          emptyMessage="No booking requests yet."
        />
      </Grid.Col>
    </Grid>
  );
}
