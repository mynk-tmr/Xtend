import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "../server/services/emailService";
import { deleteUserAccount } from "../server/services/userDeletionService";
import { client, db } from "./db";

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail(user, url);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 300, // 5 minutes
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail(user, url);
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
    deleteUser: {
      enabled: true,
      async afterDelete(user) {
        await deleteUserAccount(user.id);
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
