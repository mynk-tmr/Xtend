import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";
import { ROUTES } from "@/constants/routes";
import { checkParamsAndRedirect } from "@/lib/check-methods";
import { authModeSchema } from "@/server/validation/auth";

export const metadata: Metadata = {
  title: "Login - Xtended Space",
  description: "Sign in to your Xtended Space account",
};

export default async function LoginPage(props: PageProps<"/auth/for/[mode]">) {
  const { mode } = await props.params;
  const out = checkParamsAndRedirect(mode, authModeSchema, ROUTES.AUTHSIGN_UP);
  const isLogin = out === "login";

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
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or
            <Link
              href="/auth/for/sign-up"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
            ;
          </p>
        </div>

        <LoginForm isLogin={isLogin} />

        <div className="text-center">
          <Link
            href="/auth/password/forgot"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
