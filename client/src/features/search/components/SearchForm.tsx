import { SearchFields } from "../types/searchfields";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { categories, facilities } from "@/features/listing";
import { Button } from "primereact/button";
import { Form, useNavigation, useSearchParams } from "react-router-dom";

function fromEntriesv2(data: Iterable<[string, string]>) {
  const json = {} as Record<string, string | string[]>;
  for (const [key, value] of data) {
    if (!json[key]) json[key] = value;
    //@ts-expect-error this is fine
    else json[key] = [json[key], value].flat(Infinity);
  }
  return json;
}

export const SearchForm = () => {
  const [searchParams] = useSearchParams();
  const { register } = useForm<SearchFields>({
    values: fromEntriesv2(searchParams) as SearchFields,
  });
  const { state } = useNavigation();

  return (
    <Form
      replace
      method="get"
      //serialise form values to search params and navigate to current page
      className="flex flex-wrap gap-3 [&_input]:py-1 items-start">
      <div className="grid">
        <label htmlFor="pincode" className="text-xs font-medium">
          Pincode
        </label>
        <InputText id="pincode" {...register("pincode")} />
      </div>

      <div className="grid">
        <label htmlFor="locality" className="text-xs font-medium">
          Locality
        </label>
        <InputText id="locality" {...register("locality")} />
      </div>

      <div className="grid">
        <label htmlFor="price:gte" className="text-xs font-medium">
          Minimum Price
        </label>
        <InputText id="price:gte" {...register("price:gte")} />
      </div>

      <div className="grid">
        <label htmlFor="price:lte" className="text-xs font-medium">
          Maximum Price
        </label>
        <InputText id="price:lte" {...register("price:lte")} />
      </div>

      <div className="grid">
        <label htmlFor="height:gte" className="text-xs font-medium">
          Entrance Height (Feet)
        </label>
        <InputText id="height:gte" {...register("height:gte")} />
      </div>

      <div className="grid">
        <label htmlFor="width:gte" className="text-xs font-medium">
          Entrance Width (Feet)
        </label>
        <InputText id="width:gte" {...register("width:gte")} />
      </div>

      <div className="grid">
        <label htmlFor="area:gte" className="text-xs font-medium">
          Storage Area (Feet)
        </label>
        <InputText id="area:gte" {...register("area:gte")} />
      </div>

      <fieldset className="grid grid-cols-2">
        <legend className="font-medium col-span-2">Facilities</legend>
        {facilities.map((facility) => (
          <label key={facility} className="flex gap-2 m-1 text-sm">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities:all")}
              className="cursor-pointer scale-110 accent-love"
            />
            {facility}
          </label>
        ))}
      </fieldset>

      <fieldset className="grid grid-cols-2">
        <legend className="font-medium col-span-2">Category</legend>
        {categories.map((category) => (
          <label key={category} className="flex gap-2 m-1 text-sm">
            <input
              type="checkbox"
              value={category}
              {...register("category:in")}
              className="cursor-pointer scale-110 accent-ink"
            />
            {category}
          </label>
        ))}
      </fieldset>

      <fieldset className="grid">
        <label htmlFor="rating:gte" className="text-xs font-medium">
          Star Rating
        </label>
        <input
          type="range"
          id="rating:gte"
          className="range range-sm range-primary"
          min={1}
          max={5}
          step={1}
          defaultValue={1}
          {...register("rating:gte")}
        />
        <span className="flex justify-between mx-1 w-[120px] *:text-sm">
          <b>1</b>
          <b>2</b>
          <b>3</b>
          <b>4</b>
          <b>5</b>
        </span>
      </fieldset>

      <Button type="submit" className="w-full h-[5ch] *:mx-auto">
        {state === "loading" || state === "submitting" ? (
          <i className="pi pi-spin pi-spinner"></i>
        ) : (
          <p>Apply Filters</p>
        )}
      </Button>
    </Form>
  );
};
