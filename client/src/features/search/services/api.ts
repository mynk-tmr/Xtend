import { apiclient } from "@/lib/apiclient";
import { Listing } from "@/types/listing";

const prefix = "search?";

export type SearchResult = {
  listings: Listing[];
  pagination: undefined | Record<string, string>;
};

export const api = {
  search: async (searchParams: URLSearchParams) => {
    const res = await apiclient.get(prefix + searchParams);
    const links = res.headers.get("Link");
    let pagination;

    if (links) {
      const l = links.split(",").map((link) => link.split(";"));
      pagination = l.reduce(
        (acc, [link, rel]) => ({
          ...acc,
          [rel.slice(6, -1)]: link.replace(/[<>]/g, "").trim(),
        }),
        {}
      );
    }

    return {
      listings: await res.json(),
      pagination,
    };
  },
};
