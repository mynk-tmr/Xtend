import { apiclient } from "@/lib/apiclient";
import { Listing } from "@/types/listing";
import { Link, LoaderFunction, useLoaderData } from "react-router-dom";
import { DataViewer } from "./DataViewer";
import logoUrl from "@/common/assets/logo.png";
import { SearchForm } from "./SearchForm";
import { Fieldset } from "primereact/fieldset";

const Header = () => {
  return (
    <header>
      <Link to="/" className="mx-auto block w-fit">
        <img src={logoUrl} alt="logo" />
      </Link>
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
  const listings = useLoaderData() as Listing[];
  return (
    <section className="p-8 bg-sky-100 min-h-screen">
      <Header />
      {listings.length > 0 ? (
        <DataViewer listings={listings} />
      ) : (
        <h3 className="text-center mt-8 text-xl grid gap-3">
          No results found
          <i className="pi pi-cloud text-2xl"></i>
        </h3>
      )}
    </section>
  );
};

const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  const results = await apiclient.get(`search?${searchParams}`).json();
  return results as Listing[];
};

SearchPage.loader = loader;
