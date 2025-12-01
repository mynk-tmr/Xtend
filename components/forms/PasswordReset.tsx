"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Alert, Button, TextInput } from "@mantine/core";
import { motion } from "motion/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/api/auth-client";
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
  type ResetPasswordFormData,
  resetPasswordSchema,
} from "@/server/validation/auth";

export default function PasswordResetForm({ isForgot }: { isForgot: boolean }) {
  const schema = isForgot ? forgotPasswordSchema : resetPasswordSchema;

  const form = useForm<ForgotPasswordFormData | ResetPasswordFormData>({
    resolver: zodResolver(schema),
    defaultValues: isForgot
      ? { email: "" }
      : { currentPassword: "", newPassword: "" },
  });

  const errors = {
    currentPassword: null,
    newPassword: null,
    email: null,
    ...form.formState.errors,
  };

  const onSubmit = async (
    values: ForgotPasswordFormData | ResetPasswordFormData,
  ) => {
    form.clearErrors();

    try {
      if ("email" in values) {
        await authClient.requestPasswordReset({
          email: values.email,
          redirectTo: "/auth/password/reset",
        });
      } else {
        await authClient.changePassword(values);
      }
    } catch (err: any) {
      form.setError(
        "root",
        err?.message ??
          `Failed to ${isForgot ? "send reset link" : "reset password"}`,
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow-md rounded-lg p-8 relative">
        {/* SUCCESS VIEW */}
        {form.formState.isSubmitSuccessful ? (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Icon
                icon="heroicons:check"
                width={32}
                className="text-green-600"
              />
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isForgot ? "Check your email" : "Password updated"}
            </h3>

            <p className="text-sm text-gray-600">
              {isForgot
                ? "We've sent a password reset link to your email."
                : "Your password has been updated successfully."}
            </p>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* FORM ERROR */}
            {form.formState.errors.root && (
              <Alert color="red" mb="md">
                {form.formState.errors.root.message}
              </Alert>
            )}

            {isForgot ? (
              <TextInput
                label="Email"
                placeholder="your@email.com"
                required
                leftSection={<Icon icon="heroicons:envelope" width={16} />}
                error={errors.email?.message}
                {...form.register("email")}
              />
            ) : (
              <>
                <TextInput
                  label="Current Password"
                  type="password"
                  required
                  leftSection={<Icon icon="heroicons:lock-closed" width={16} />}
                  error={errors.currentPassword?.message}
                  {...form.register("currentPassword")}
                />

                <TextInput
                  label="New Password"
                  type="password"
                  required
                  leftSection={<Icon icon="heroicons:lock-closed" width={16} />}
                  error={errors.newPassword?.message}
                  {...form.register("newPassword")}
                />
              </>
            )}

            <Button
              type="submit"
              fullWidth
              disabled={form.formState.isSubmitting}
              leftSection={
                form.formState.isSubmitting ? null : (
                  <Icon icon="heroicons:paper-airplane" width={16} />
                )
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              {form.formState.isSubmitting
                ? isForgot
                  ? "Sending..."
                  : "Resetting..."
                : isForgot
                  ? "Send reset link"
                  : "Reset password"}
            </Button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link
            href="/auth/for/login"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
