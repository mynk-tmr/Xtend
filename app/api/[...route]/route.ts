import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { errorHandler } from "@/server/middleware/error";
import { adminRouter } from "@/server/routes/admin";
import { amenitiesRouter } from "@/server/routes/amenities";
import { authRouter } from "@/server/routes/auth";
import { bookingsRouter } from "@/server/routes/bookings";
import { complaintsRouter } from "@/server/routes/complaints";
import { listingsRouter } from "@/server/routes/listings";
import { shortlistsRouter } from "@/server/routes/shortlists";
import { usersRouter } from "@/server/routes/users";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", cors());

// Routes
app.route("/auth", authRouter);
app.route("/users", usersRouter);
app.route("/listings", listingsRouter);
app.route("/bookings", bookingsRouter);
app.route("/shortlists", shortlistsRouter);
app.route("/complaints", complaintsRouter);
app.route("/amenities", amenitiesRouter);
app.route("/admin", adminRouter);

// Error handling
app.onError(errorHandler);

// Health check
app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;
