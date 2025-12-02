import type { Route } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { z } from "zod/v4";
import { auth } from "@/lib/auth";

export function checkParamsAndRedirect<
  T extends Readonly<Record<string, z.core.util.EnumValue>>,
>(mode: string, schema: z.ZodEnum<T>, redirectUrl: Route) {
  const result = schema.safeParse(mode);
  if (result.success) return result.data;
  throw redirect(redirectUrl);
}

export async function checkNoAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    throw redirect("/dashboard");
  }
  return null;
}

export async function checkAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/for/login");
  }
  return session;
}
