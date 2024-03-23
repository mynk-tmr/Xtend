import { apiclient } from "@/lib/apiclient";
import { dateToISO } from "@/lib/intl";
const prefix = "bookings/";

export const bookapi = {
  getall: async () => {
    return await apiclient.get("bookings/all").json();
  },
  request: async (form: FormData, id: string) => {
    const dates = (form.get("dates") as string).split(" - ");
    const [start, end] = dateToISO(dates);
    return await apiclient.post(prefix + `request/${id}`, {
      json: {
        start,
        end,
      },
    });
  },
  cancel: async (id: string) => {
    return await apiclient.post(prefix + `cancel/${id}`);
  },
  confirm: async (id: string, status: string) => {
    return await apiclient.post(prefix + `confirm/${id}`, {
      json: {
        status,
      },
    });
  },
};
