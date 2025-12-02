import { Container, Title } from "@mantine/core";
import { motion } from "motion/react";
import type { Metadata } from "next";
import BookingRequestsClient from "./BookingRequestsClient";

export const metadata: Metadata = {
  title: "Booking Requests - Xtended Space",
  description: "View and manage booking requests for your listings",
};

export default function BookingRequestsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container size="xl" className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title order={1} className="text-center text-gray-900">
            Booking Requests
          </Title>

          <BookingRequestsClient />
        </motion.div>
      </Container>
    </div>
  );
}
