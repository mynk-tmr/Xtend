"use client";

// import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Alert, Button, Group, Textarea, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { getCreateBookingOptions } from "@/lib/api/bookings/options";
import type { CreateBookingData } from "@/types";

interface BookingFormProps {
  listingId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function BookingForm({
  listingId,
  onSuccess,
  onCancel,
}: BookingFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createBookingMutation = useMutation(
    getCreateBookingOptions(queryClient),
  );

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CreateBookingData>({
    defaultValues: {
      listingId: listingId || "",
      message: "",
    },
  });

  const onSubmit = async (values: CreateBookingData) => {
    try {
      await createBookingMutation.mutateAsync(values);

      notifications.show({
        title: "Success",
        message: "Your booking request has been sent successfully",
        color: "green",
      });

      if (onSuccess) {
        onSuccess();
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError("root", err.message || "Failed to create booking request");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-4"
    >
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Request Booking
        </h2>

        {errors.root && (
          <Alert color="red" mb="md">
            {errors.root.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <TextInput
            label="Listing ID"
            placeholder="Listing ID will be auto-filled"
            {...control.register("listingId")}
            error={errors.listingId?.message}
          />

          <Textarea
            label="Message to Owner"
            placeholder="Write a message to the property owner..."
            minRows={4}
            required
            {...control.register("message")}
            error={errors.message?.message}
          />

          <Group justify="space-between" mt="6">
            {onCancel && (
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}

            <Button
              type="submit"
              loading={isSubmitting}
              leftSection={<Icon icon="mdi:send" width={16} />}
            >
              Send Request
            </Button>
          </Group>
        </form>
      </div>
    </motion.div>
  );
}
