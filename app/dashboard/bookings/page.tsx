import { Icon } from "@iconify/react";
import { Container, Grid, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import type { Metadata } from "next";
import BookingList from "@/components/booking/BookingList";
import { getBookingsOptions } from "@/lib/api/bookings/options";

export const metadata: Metadata = {
  title: "My Bookings - Xtended Space",
  description: "View and manage your booking requests",
};

export default async function BookingsPage() {
  const { data: bookings, isLoading, error } = useQuery(getBookingsOptions());

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
            Error Loading Bookings
          </Title>
          <p className="text-center mt-2 opacity-70">
            Please try refreshing the page or contact support if the problem
            persists.
          </p>
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
          className="mb-8"
        >
          <Title order={1} className="text-center text-gray-900">
            My Bookings
          </Title>

          <Grid>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <BookingList
                bookings={bookings || []}
                title="Your Bookings"
                emptyMessage="You haven't made any booking requests yet."
              />
            </Grid.Col>
          </Grid>
        </motion.div>
      </Container>
    </div>
  );
}
