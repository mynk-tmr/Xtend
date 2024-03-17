import ky from "ky";
import { LoginValues } from "../types/creds";

const BASEURL = import.meta.env.VITE_SERVER_URL ?? "";

const ky2 = ky.create({
  prefixUrl: `${BASEURL}/api/auth`,
  credentials: "include", // send & receive cookies
});

export const api = {
  login: async ({ email, password }: LoginValues) => {
    return await ky2
      .post("login", {
        json: {
          email,
          password,
        },
      })
      .json();
  },

  logout: async () => {
    return await ky2.post("logout", {
      json: {},
    });
  },

  update: async (data: FormData, userId: string) => {
    return await ky2.put(`update/${userId}`, {
      body: data,
    });
  },
};
