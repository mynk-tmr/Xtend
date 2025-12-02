"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import {
  Alert,
  Button,
  Checkbox,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/api/auth-client";
import {
  type LoginFormData,
  loginSchema,
  type SignupFormData,
  signupSchema,
} from "@/server/validation/auth";

interface AuthFormProps {
  isLogin: boolean;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const router = useRouter();
  const schema = isLogin ? loginSchema : signupSchema;

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    register,
  } = useForm<LoginFormData | SignupFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: LoginFormData | SignupFormData) => {
    try {
      if (isLogin) {
        await authClient.signIn.email({
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe,
        });
      } else {
        await authClient.signUp.email({
          email: values.email,
          password: values.password,
          name: `${(values as SignupFormData).firstName} ${(values as SignupFormData).lastName}`,
          firstName: (values as SignupFormData).firstName,
          lastName: (values as SignupFormData).lastName,
        });
      }

      notifications.show({
        title: "Success",
        message: isLogin
          ? "You have been logged in successfully"
          : "Your account has been created successfully",
        color: "green",
      });

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(
        "root",
        err.message || `${isLogin ? "Login" : "Sign up"} failed`,
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="bg-white shadow-md rounded-lg p-8 mt-8 relative">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>

        {errors.root && (
          <Alert color="red" mb="md">
            {errors.root.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <TextInput
                  label="First Name"
                  placeholder="John"
                  required
                  {...register("firstName")}
                  error={(errors as any).firstName?.message}
                />
              </div>
              <div>
                <TextInput
                  label="Last Name"
                  placeholder="Doe"
                  required
                  {...register("lastName")}
                  error={(errors as any).lastName?.message}
                />
              </div>
            </div>
          )}

          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            leftSection={<Icon icon="heroicons:envelope" width={16} />}
            {...register("email")}
            error={errors.email?.message}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            leftSection={<Icon icon="heroicons:lock-closed" width={16} />}
            error={errors.password?.message}
            {...register("password")}
          />

          {!isLogin && (
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              required
              leftSection={<Icon icon="heroicons:lock-closed" width={16} />}
              error={(errors as any).confirmPassword?.message}
              {...register("confirmPassword")}
            />
          )}

          <div className="flex items-center justify-between">
            <Checkbox label="Remember me" {...register("rememberMe")} />
          </div>

          <Button type="submit" fullWidth loading={isSubmitting}>
            Submit
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="outline"
            leftSection={<Icon icon="flat-color-icons:google" width={16} />}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Google
          </Button>
          <Button
            variant="outline"
            leftSection={<Icon icon="fa6-brands:github" width={16} />}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={isLogin ? "/auth/for/sign-up" : "/auth/for/login"}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
