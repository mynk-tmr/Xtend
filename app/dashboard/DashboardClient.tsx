"use client";

import { Grid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import {
  getBookingRequestsOptions,
  getBookingsOptions,
} from "@/lib/api/bookings/options";
import { getUserListingsOptions } from "@/lib/api/listings/options";

export default function DashboardClient() {
  const {
    data: listings,
    isLoading: listingsLoading,
    error: listingsError,
  } = useQuery(getUserListingsOptions());

  const {
    data: bookings,
    isLoading: bookingsLoading,
    error: bookingsError,
  } = useQuery(getBookingsOptions());

  const {
    data: bookingRequests,
    isLoading: requestsLoading,
    error: requestsError,
  } = useQuery(getBookingRequestsOptions());

  if (listingsLoading || bookingsLoading || requestsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (listingsError || bookingsError || requestsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">
            Error Loading Dashboard. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
          <DashboardStats
            listings={listings || []}
            bookings={bookings || []}
            bookingRequests={bookingRequests || []}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <RecentActivity
            listings={listings || []}
            bookings={bookings || []}
            bookingRequests={bookingRequests || []}
          />
        </Grid.Col>
      </Grid>

      <Grid.Col span={{ base: 12, md: 12, lg: 4 }}>
        <QuickActions />
      </Grid.Col>
    </>
  );
}
