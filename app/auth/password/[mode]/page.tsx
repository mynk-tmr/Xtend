import { Icon } from "@iconify/react";
import type { Metadata, Route } from "next";
import Link from "next/link";
import PasswordResetForm from "@/components/forms/PasswordReset";
import { checkNoAuth, checkParamsAndRedirect } from "@/lib/check-methods";
import { passwordModeSchema } from "@/server/validation/auth";

export const metadata: Metadata = {
  title: "Password Recovery or Reset - Xtended Space",
  description: "Recover or Reset the Password of user.",
};

export default async function PasswordPage(props: {
  params: Promise<{ mode: string }>;
}) {
  await checkNoAuth();
  const { mode } = await props.params;
  const isForgot =
    checkParamsAndRedirect(
      mode,
      passwordModeSchema,
      "/auth/for/login" as Route,
    ) === "forgot";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link
            href="/"
            className="flex justify-center items-center space-x-2 mb-6"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon
                icon="heroicons:building-office-2"
                width={24}
                height={24}
                className="text-white"
              />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Xtended Space
            </span>
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isForgot ? "Forgot your password?" : "Reset your password"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isForgot
              ? "Enter your email address and we'll send you a link to reset your password."
              : "Enter your new password below."}
          </p>
        </div>

        <PasswordResetForm isForgot={isForgot} />
      </div>
    </div>
  );
}
