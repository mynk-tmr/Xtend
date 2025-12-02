"use client";

import { Icon } from "@iconify/react";
import { Button, Card, Text, Title } from "@mantine/core";
import { motion } from "motion/react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function QuickActions() {
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
            Quick Actions
          </Title>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            component={Link}
            href={ROUTES.LISTINGS_NEW}
            variant="outline"
            leftSection={<Icon icon="mdi:plus" width={16} />}
            className="h-full p-4 flex flex-col items-center justify-center"
          >
            <Icon icon="mdi:package-variant" width={32} className="mb-2" />
            <Text size="lg" fw={500}>
              List New Space
            </Text>
            <Text size="sm" c="dimmed">
              Add a new storage listing
            </Text>
          </Button>

          <Button
            component={Link}
            href="/dashboard/bookings"
            variant="outline"
            leftSection={<Icon icon="mdi:calendar-check" width={16} />}
            className="h-full p-4 flex flex-col items-center justify-center"
          >
            <Icon icon="mdi:format-list-bulleted" width={32} className="mb-2" />
            <Text size="lg" fw={500}>
              My Bookings
            </Text>
            <Text size="sm" c="dimmed">
              View your booking requests
            </Text>
          </Button>
        </div>

        <div className="md:col-span-2">
          <Text size="sm" c="dimmed" className="text-center">
            Need help? Check your listings and manage bookings from your
            dashboard.
          </Text>
        </div>
      </Card>
    </motion.div>
  );
}
