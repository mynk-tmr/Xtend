import type { Route } from "next";

export const ROUTES = {
  AUTHLOGIN: "/auth/for/login" as Route,
  AUTHSIGN_UP: "/auth/for/sign-up" as Route,
  PASSWORDFORGOT: "/auth/password/forgot" as Route,
  PASSWORDRESET: "/auth/password/reset" as Route,
  DASHBOARD: "/dashboard",
  DASHBOARD_BOOKINGS: "/dashboard/bookings",
  LISTINGS: "/listings",
  LISTINGS_NEW: "/dashboard/listings/new",
  TERMS: "/terms" as Route,
  PRIVACY: "/privacy" as Route,
  HOME: "/",
} as const;
