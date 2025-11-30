import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, db } from "./db";

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 300, // 5 minutes
    sendVerificationEmail: async ({ user, url }) => {
      // This will be implemented later with Resend
      console.log(`Verification email sent to ${user.email}: ${url}`);
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,
      },
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      phoneNumber: {
        type: "string",
        required: false,
      },
    },
  },
});

type Session = typeof auth.$Infer.Session.session;
type User = typeof auth.$Infer.Session.user;

export type BetterAuthVariables = {
  user: User;
  session: Session;
};
