import {
  LoaderFunction,
  defer,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { DataViewer } from "./DataViewer";
import { SearchForm } from "./SearchForm";
import { Fieldset } from "primereact/fieldset";
import { SearchResult, api } from "../services/api";
import Pagination from "./Paginator";
import { XtendedLogo } from "@/common/components/XtendedLogo";
import { AsyncUI } from "@/common/components/AsyncUI";

const Header = () => {
  return (
    <header>
      <XtendedLogo />
      <h1 className="font-semibold mb-8 text-center">
        Let us help you find that perfect storage.
      </h1>
      <Fieldset
        legend={
          <span>
            <i className="pi pi-filter text-ink"></i> Filters
          </span>
        }
        toggleable>
        <SearchForm />
      </Fieldset>
    </header>
  );
};

export const SearchPage = () => {
  const { res } = useLoaderData() as { res: Promise<SearchResult> };
  const goto = useNavigate();
  return (
    <section className="p-8 bg-sky-100 min-h-screen">
      <Header />
      <AsyncUI promise={res} refetch={() => goto("/search")}>
        {({ listings, pagination }) => {
          if (listings.length === 0) {
            return (
              <h3 className="text-center mt-8 text-xl grid gap-3">
                No results found
                <i className="pi pi-cloud text-2xl"></i>
              </h3>
            );
          } else {
            return (
              <section
                ref={(node) => node?.scrollIntoView({ behavior: "smooth" })}>
                <DataViewer listings={listings} />
                <Pagination links={pagination} />
              </section>
            );
          }
        }}
      </AsyncUI>
    </section>
  );
};

const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const searchPromise = api.search(searchParams);
  return defer({ res: searchPromise });
};

SearchPage.loader = loader;
