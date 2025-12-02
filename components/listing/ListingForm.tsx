"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import {
  Alert,
  Button,
  Checkbox,
  Group,
  NumberInput,
  Select,
  Stepper,
  Textarea,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod/v4";
import { getAmenitiesOptions } from "@/lib/api/amenities/options";
import { getCreateListingOptions } from "@/lib/api/listings/options";
import type { StorageTypeSchemaTypes } from "@/server/validation/+others";
import { schemaCreateListing } from "@/server/validation/listings";

type CreateListingFormData = z.infer<typeof schemaCreateListing>;

interface ListingFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface PriceInputProps {
  control: any;
  errors: any;
}

function PriceInput({ control, errors }: PriceInputProps) {
  return (
    <Group grow>
      <Controller
        name="price.value"
        control={control}
        render={({ field }) => (
          <NumberInput
            label="Price"
            placeholder="Amount"
            min={0}
            required
            leftSection="₹"
            value={field.value}
            onChange={(value) => field.onChange(Number(value))}
            error={errors.price?.value?.message}
          />
        )}
      />
      <Controller
        name="price.basis"
        control={control}
        render={({ field }) => (
          <Select
            label="Price Basis"
            placeholder="Select basis"
            data={[
              { value: "month", label: "Per Month" },
              { value: "day", label: "Per Day" },
              { value: "week", label: "Per Week" },
            ]}
            value={field.value}
            onChange={field.onChange}
            error={errors.price?.basis?.message}
          />
        )}
      />
    </Group>
  );
}

interface LocationInputProps {
  control: any;
  errors: any;
}

function LocationInput({ control, errors }: LocationInputProps) {
  return (
    <>
      <TextInput
        label="Address"
        placeholder="Enter complete address"
        required
        {...control.register("location.address")}
        error={errors.location?.address?.message}
      />

      <Group grow>
        <TextInput
          label="City"
          placeholder="Enter city"
          required
          {...control.register("location.city")}
          error={errors.location?.city?.message}
        />

        <TextInput
          label="State"
          placeholder="Enter state"
          required
          {...control.register("location.state")}
          error={errors.location?.state?.message}
        />
      </Group>

      <Group grow>
        <TextInput
          label="Country"
          placeholder="Enter country"
          required
          {...control.register("location.country")}
          error={errors.location?.country?.message}
        />

        <TextInput
          label="Postal Code"
          placeholder="Enter postal code"
          required
          {...control.register("location.postalCode")}
          error={errors.location?.postalCode?.message}
        />
      </Group>

      <Controller
        name="accessHours.type"
        control={control}
        render={({ field }) => (
          <Select
            label="Access Hours"
            placeholder="Select access type"
            data={[
              { value: "24_7", label: "24/7 Access" },
              {
                value: "business_hours",
                label: "Business Hours (9 AM - 6 PM)",
              },
              { value: "restricted", label: "Restricted Access" },
              { value: "weekends", label: "Weekend Access Only" },
            ]}
            value={field.value}
            onChange={field.onChange}
            error={errors.accessHours?.type?.message}
          />
        )}
      />

      <Textarea
        label="Access Description (Optional)"
        placeholder="Describe any specific access instructions..."
        {...control.register("accessHours.description")}
        error={errors.accessHours?.description?.message}
      />

      <Group grow>
        <Controller
          name="location.coordinates.lat"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Latitude"
              placeholder="Enter latitude"
              decimalScale={6}
              step={0.000001}
              value={field.value}
              onChange={(value) => field.onChange(Number(value))}
              error={errors.location?.coordinates?.lat?.message}
            />
          )}
        />

        <Controller
          name="location.coordinates.lng"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Longitude"
              placeholder="Enter longitude"
              decimalScale={6}
              step={0.000001}
              value={field.value}
              onChange={(value) => field.onChange(Number(value))}
              error={errors.location?.coordinates?.lng?.message}
            />
          )}
        />
      </Group>
    </>
  );
}

export default function ListingForm({ onSuccess, onCancel }: ListingFormProps) {
  const queryClient = useQueryClient();
  const createListingMutation = useMutation(
    getCreateListingOptions(queryClient),
  );
  const [active, setActive] = useState(0);

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    control,
    trigger,
  } = useForm<CreateListingFormData>({
    resolver: zodResolver(schemaCreateListing) as any,
    defaultValues: {
      price: {
        value: 0,
        basis: "month",
      },
      location: {
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        coordinates: {
          lat: 0,
          lng: 0,
        },
      },
      accessHours: {
        type: "business_hours",
      },
      isAvailable: true,
    },
  });

  const watchedStorageType = control._formValues?.storageType;

  const { data: allAmenities } = useQuery(getAmenitiesOptions());

  const onSubmit = async (values: CreateListingFormData) => {
    try {
      // Convert amenities array to include proper amenity IDs
      const submissionData = {
        ...values,
        amenitiesId: values.amenitiesId || [],
      };
      await createListingMutation.mutateAsync(submissionData);

      notifications.show({
        title: "Success",
        message: "Your listing has been created successfully",
        color: "green",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError("root", err.message || "Failed to create listing");
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = [
      [
        "title",
        "description",
        "storageType",
        "price.value",
        "price.basis",
        "area",
        "height",
      ],
      [
        "location.address",
        "location.city",
        "location.state",
        "location.country",
        "location.postalCode",
        "accessHours.type",
      ],
      [],
    ];

    const isValid = await trigger(fieldsToValidate[active] as any);
    if (isValid) {
      setActive((current) => (current < 2 ? current + 1 : current));
    }
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const storageTypes: { value: StorageTypeSchemaTypes; label: string }[] = [
    { value: "self_storage", label: "Self Storage" },
    { value: "warehouse", label: "Warehouse" },
    { value: "commercial", label: "Commercial Space" },
    { value: "vehicle", label: "Vehicle Storage" },
    { value: "specialized", label: "Specialized Storage" },
    { value: "workshop", label: "Workshop" },
    { value: "coworking", label: "Co-working Space" },
    { value: "agricultural", label: "Agricultural Storage" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Create New Listing
        </h2>

        <Stepper active={active} onStepClick={setActive} mb="xl">
          <Stepper.Step
            label="Basic Information"
            description="Title, type, and pricing"
          />
          <Stepper.Step
            label="Location"
            description="Address and access details"
          />
          <Stepper.Step
            label="Additional Details"
            description="Features and amenities"
          />
        </Stepper>

        {errors.root && (
          <Alert color="red" mb="md">
            {errors.root.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Basic Information */}
          {active === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Basic Information
              </h3>

              <TextInput
                label="Title"
                placeholder="Enter a descriptive title for your space"
                required
                {...control.register("title")}
                error={errors.title?.message}
              />

              <Textarea
                label="Description"
                placeholder="Describe your space in detail..."
                minRows={4}
                required
                {...control.register("description")}
                error={errors.description?.message}
              />

              <Group grow>
                <Controller
                  name="storageType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Storage Type"
                      placeholder="Select storage type"
                      data={storageTypes}
                      required
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.storageType?.message}
                    />
                  )}
                />

                <PriceInput control={control} errors={errors} />
              </Group>

              <Group grow>
                <Controller
                  name="area"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      label="Area (sq ft)"
                      placeholder="Enter area in square feet"
                      min={0}
                      required
                      value={field.value}
                      onChange={(value) => field.onChange(Number(value))}
                      error={errors.area?.message}
                    />
                  )}
                />

                <Controller
                  name="height"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      label="Height (ft)"
                      placeholder="Enter ceiling height in feet"
                      min={0}
                      required
                      value={field.value}
                      onChange={(value) => field.onChange(Number(value))}
                      error={errors.height?.message}
                    />
                  )}
                />
              </Group>

              <Controller
                name="loadingCapacity"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    label="Loading Capacity (kg/tons)"
                    placeholder="Enter weight capacity"
                    min={0}
                    value={field.value}
                    onChange={(value) => field.onChange(Number(value))}
                    error={errors.loadingCapacity?.message}
                  />
                )}
              />
            </motion.div>
          )}

          {/* Step 2: Location and Access */}
          {active === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Location and Access
              </h3>

              <LocationInput control={control} errors={errors} />
            </motion.div>
          )}

          {/* Step 3: Additional Details */}
          {active === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Additional Details
              </h3>

              {/* Storage Type Specific Fields */}
              {watchedStorageType === "self_storage" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">
                    Self Storage Details
                  </h4>
                  <Group grow>
                    <TextInput
                      label="Unit Number"
                      placeholder="e.g., A-101"
                      {...control.register("unitNumber")}
                      error={errors.unitNumber?.message}
                    />

                    <Controller
                      name="floorLevel"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          label="Floor Level"
                          placeholder="Enter floor level"
                          min={1}
                          value={field.value}
                          onChange={(value) => field.onChange(Number(value))}
                          error={errors.floorLevel?.message}
                        />
                      )}
                    />
                  </Group>

                  <Controller
                    name="unitSize"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Unit Size"
                        placeholder="Select unit size"
                        data={[
                          { value: "small", label: "Small" },
                          { value: "medium", label: "Medium" },
                          { value: "large", label: "Large" },
                          { value: "extra_large", label: "Extra Large" },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.unitSize?.message}
                      />
                    )}
                  />
                </div>
              )}

              {watchedStorageType === "warehouse" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">
                    Warehouse Details
                  </h4>
                  <Group grow>
                    <Controller
                      name="warehouseSize"
                      control={control}
                      render={({ field }) => (
                        <Select
                          label="Warehouse Size"
                          placeholder="Select warehouse size"
                          data={[
                            { value: "small", label: "Small" },
                            { value: "medium", label: "Medium" },
                            { value: "large", label: "Large" },
                          ]}
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.warehouseSize?.message}
                        />
                      )}
                    />

                    <Controller
                      name="dockDoors"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          label="Dock Doors"
                          placeholder="Number of dock doors"
                          min={0}
                          value={field.value}
                          onChange={(value) => field.onChange(Number(value))}
                          error={errors.dockDoors?.message}
                        />
                      )}
                    />
                  </Group>

                  <Group grow>
                    <Controller
                      name="officeSpace"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          label="Office Space (sq ft)"
                          placeholder="Office space area"
                          min={0}
                          value={field.value}
                          onChange={(value) => field.onChange(Number(value))}
                          error={errors.officeSpace?.message}
                        />
                      )}
                    />

                    <Controller
                      name="ceilingHeight"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          label="Ceiling Height (ft)"
                          placeholder="Ceiling height"
                          min={0}
                          value={field.value}
                          onChange={(value) => field.onChange(Number(value))}
                          error={errors.ceilingHeight?.message}
                        />
                      )}
                    />
                  </Group>

                  <Group>
                    <Checkbox
                      label="Sprinkler System"
                      {...control.register("sprinklerSystem")}
                    />
                    <Checkbox
                      label="Forklift Available"
                      {...control.register("forkliftAvailable")}
                    />
                    <Checkbox
                      label="Truck Access"
                      {...control.register("truckAccess")}
                    />
                  </Group>
                </div>
              )}

              {/* Amenities Selection */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Amenities</h4>
                <div className="grid grid-cols-2 gap-2">
                  {allAmenities?.map((amenity) => (
                    <Checkbox
                      key={amenity._id}
                      label={amenity.name}
                      value={amenity._id}
                      {...control.register("amenitiesId")}
                    />
                  ))}
                </div>
              </div>

              <Checkbox
                label="Available for Rent"
                description="Uncheck if space is temporarily unavailable"
                {...control.register("isAvailable")}
              />
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <Group justify="space-between" mt="xl">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={active === 0}
              leftSection={<Icon icon="mdi:chevron-left" width={16} />}
            >
              Previous
            </Button>

            <Group>
              {onCancel && (
                <Button variant="outline" color="gray" onClick={onCancel}>
                  Cancel
                </Button>
              )}

              {active < 2 ? (
                <Button
                  onClick={nextStep}
                  rightSection={<Icon icon="mdi:chevron-right" width={16} />}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  loading={isSubmitting}
                  leftSection={<Icon icon="mdi:check" width={16} />}
                >
                  Create Listing
                </Button>
              )}
            </Group>
          </Group>
        </form>
      </div>
    </motion.div>
  );
}
