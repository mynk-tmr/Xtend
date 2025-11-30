import type { Context } from "hono";

export const errorHandler = (err: Error, c: Context) => {
  console.error(err);

  return c.json(
    {
      error: {
        message: err.message || "Internal Server Error",
        status: 500,
      },
    },
    500,
  );
};
