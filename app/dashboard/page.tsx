import { Icon } from "@iconify/react";
import { Container, Grid, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import type { Metadata } from "next";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import {
  getBookingRequestsOptions,
  getBookingsOptions,
} from "@/lib/api/bookings/options";
import { getUserListingsOptions } from "@/lib/api/listings/options";
import { checkAuth } from "@/lib/check-methods";

export const metadata: Metadata = {
  title: "Dashboard - Xtended Space",
  description: "Manage your listings, bookings, and account settings",
};

export default async function DashboardPage() {
  const { user } = await checkAuth();

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
          <Icon
            icon="mdi:alert-circle"
            width={48}
            className="text-red-500 mx-auto"
          />
          <Title order={1} c="red" className="mt-4">
            Error Loading Dashboard
          </Title>
          <span className="opacity-70">
            Please try refreshing the page or contact support if the problem
            persists.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container size="xl" className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <Title order={1} className="text-center text-gray-900">
              Welcome back, {user.firstName}!
            </Title>
            <p className="text-center mt-2 text-lg opacity-70">
              Manage your storage listings, bookings, and account settings from
              your dashboard.
            </p>
          </div>

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
        </motion.div>
      </Container>
    </div>
  );
}
