import { Hono } from "hono";
import { auth } from "@/lib/auth";

export const authRouter = new Hono();

// Better-Auth handles all the authentication endpoints
// We just need to proxy the requests to the auth handler
authRouter.all("/**", async (c) => {
  return auth.handler(c.req.raw);
});
