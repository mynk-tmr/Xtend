import type { Context, Next } from "hono";
import { auth } from "@/lib/auth";

export const authMiddleware = async (c: Context, next: Next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: { message: "Unauthorized" } }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
};

export const adminAuthMiddleware = async (c: Context, next: Next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: { message: "Unauthorized" } }, 401);
  }

  if (session.user.role !== "admin") {
    return c.json({ error: { message: "Forbidden" } }, 403);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
};
