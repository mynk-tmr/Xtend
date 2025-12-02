import { Container, Title } from "@mantine/core";
import { motion } from "motion/react";
import type { Metadata } from "next";
import BookingsClient from "./BookingsClient";

export const metadata: Metadata = {
  title: "My Bookings - Xtended Space",
  description: "View and manage your booking requests",
};

export default function BookingsPage() {
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

          <BookingsClient />
        </motion.div>
      </Container>
    </div>
  );
}
