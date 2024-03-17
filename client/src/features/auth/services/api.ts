import ky from "ky";
import { AuthType, RegistrationValues } from "../types/creds";

const BASEURL = import.meta.env.VITE_SERVER_URL ?? "";

const ky2 = ky.create({
  prefixUrl: `${BASEURL}/api/auth`,
  credentials: "include", // send & receive cookies
});

export const api = {
  login: async ({ email, uniqueID, password }: AuthType) => {
    return await ky2
      .post("login", {
        json: {
          email,
          uniqueID,
          password,
        },
      })
      .json();
  },

  register: async ({ username, email, password }: RegistrationValues) => {
    return await ky2.post("register", {
      json: {
        username,
        email,
        password,
      },
    });
  },

  logout: async () => {
    return await ky2.post("logout", {
      json: {},
    });
  },
};
