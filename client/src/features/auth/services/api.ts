import { apiclient } from "@/lib/apiclient";

const prefix = "auth/";

export const api = {
  login: async (data: { email: string; password: string }) => {
    return await apiclient
      .post(prefix + "login", {
        json: data,
      })
      .json();
  },

  register: async (data: {
    email: string;
    fullname: string;
    password: string;
  }) => {
    return await apiclient
      .post(prefix + "register", {
        json: data,
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
