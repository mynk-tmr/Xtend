import ky from "ky";

const BASEURL = import.meta.env.VITE_SERVER_URL ?? "";

export const apiclient = ky.create({
  prefixUrl: `${BASEURL}/api/`,
  credentials: "include", // send & receive cookies
});
