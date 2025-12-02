import { Container, Title } from "@mantine/core";
import { motion } from "motion/react";
import type { Metadata } from "next";
import { checkAuth } from "@/lib/check-methods";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard - Xtended Space",
  description: "Manage your listings, bookings, and account settings",
};

export default async function DashboardPage() {
  const { user } = await checkAuth();

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

          <DashboardClient />
        </motion.div>
      </Container>
    </div>
  );
}
