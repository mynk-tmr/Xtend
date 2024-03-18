import { LoginValues } from "../types/creds";
import { apiclient } from "@/lib/apiclient";

const prefix = "auth/";

export const api = {
  login: async ({ email, password }: LoginValues) => {
    return await apiclient
      .post(prefix + "login", {
        json: {
          email,
          password,
        },
      })
      .json();
  },

  logout: async () => {
    return await apiclient.post(prefix + "logout", {
      json: {},
    });
  },

  update: async (data: FormData) => {
    return await apiclient.put(prefix + "update", {
      body: data,
    });
  },
};
