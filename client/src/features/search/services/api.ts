import { apiclient } from "@/lib/apiclient";
import { Listing } from "@/types/listing";

export type SearchResult = {
  listings: Listing[];
  pagination: undefined | Record<string, string>;
};

export const api = {
  search: async (searchParams: URLSearchParams) => {
    const res = await apiclient.get("search?" + searchParams);
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
  getListing: async (id: string) => {
    return await apiclient.get(`search/${id}`).json();
  },
};
