import { Fieldset } from "primereact/fieldset";
import { useListForm } from "./hooks/useListForm";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { categories, facilities } from "./config/listform";
import useImagePreviewer from "@/hooks/useImagePreviewer";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import usePostalAPI from "@/hooks/usePostalAPI";
import { useToast } from "@/providers/ToastProvider";
import { Listing } from "@/common/types/listing";
import { useRef } from "react";

export const FormContainer = ({
  submit,
  withData,
  submitBtnText,
}: {
  submit: (formdata: FormData) => void;
  withData: Listing;
  submitBtnText: string;
}) => {
  const form = useListForm(
    withData ?? JSON.parse(localStorage.getItem("listdraft") ?? "{}")
  );
  const { images, changeImages, clearImages } = useImagePreviewer();
  const { isFetching, localities, refetch } = usePostalAPI(
    form.hookform.getValues,
    form.hookform.setValue
  );
  const formRef = useRef<HTMLFormElement>(null);

  const toast = useToast();
  const onValid = () => {
    if (images.length > 6 || images.length === 0)
      return toast.error("1-6 images are allowed");
    const data = new FormData(formRef.current!);
    submit(data);
  };

  return (
    <form
      className="grid lg:grid-cols-2 gap-6 [&_input]:py-2"
      onSubmit={form.hookform.handleSubmit(onValid)}>
      <Button
        type="submit"
        icon="pi pi-check"
        className="fixed bottom-4 left-8 z-50 px-6">
        {submitBtnText ?? "Add Listing"}
      </Button>
      <Fieldset
        legend={
          <b className="text-ink flex items-center gap-3">
            Identification Details <i className="pi pi-id-card"></i>
          </b>
        }
        pt={{
          root: { style: { fontFamily: "Lato, sans-serif" } },
          content: {
            className: "grid gap-4 xs:grid-cols-[1fr_3fr] items-center",
          },
        }}>
        <label htmlFor="name">Name</label>
        <InputText keyfilter={/^[a-zA-Z\s]*$/i} id="name" {...form.name} />
        <label htmlFor="description">Description</label>
        <InputTextarea rows={5} id="description" {...form.description} />

        <label htmlFor="pincode">Pincode</label>
        <div className="p-inputgroup">
          <InputText
            keyfilter={/^[0-9]$/}
            maxLength={6}
            id="pincode"
            {...form.pincode}
          />
          <Button
            type="button"
            onClick={() => refetch()}
            className="p-inputgroup-addon">
            {isFetching ? (
              <i className="pi pi-spin pi-spinner"></i>
            ) : (
              <i className="pi pi-search"></i>
            )}
          </Button>
        </div>

        <label htmlFor="state">State</label>
        <InputText
          readOnly
          placeholder="Select Pincode"
          id="state"
          {...form.state}
        />
        <label htmlFor="city">City</label>
        <InputText
          readOnly
          placeholder="Select Pincode"
          id="city"
          {...form.city}
        />
        <label htmlFor="locality">Locality</label>
        <Dropdown
          inputId="locality"
          readOnly={!localities}
          placeholder={localities ? "Pick 1" : "Select Pincode"}
          value={form.hookform.watch("address.locality")}
          onChange={(e) => form.hookform.setValue("address.locality", e.value)}
          pt={{
            input: { className: "py-2" },
          }}
          options={localities}
        />
      </Fieldset>

      <Fieldset
        legend={
          <b className="text-ink flex items-center gap-3">
            Price and Dimensions <i className="pi pi-wallet"></i>
          </b>
        }
        pt={{
          root: { style: { fontFamily: "Lato, sans-serif" } },
          content: {
            className: "grid gap-4 xs:grid-cols-[1fr_3fr] items-center",
          },
        }}>
        <label htmlFor="price">Price per day</label>
        <InputText id="price" keyfilter="money" {...form.price} />
        <label htmlFor="discount">Discount per day</label>
        <InputText id="discount" keyfilter="money" {...form.discount} />
        <label htmlFor="width">Entrance Width</label>
        <InputText id="width" keyfilter="int" {...form.width} />
        <label htmlFor="height">Entrance Height</label>
        <InputText id="height" keyfilter="int" {...form.height} />
        <label htmlFor="area">Storage Area</label>
        <InputText id="area" keyfilter="int" {...form.area} />
      </Fieldset>

      <Fieldset
        legend={
          <b className="text-ink flex items-center gap-3">
            Category & Facilities <i className="pi pi-home"></i>
          </b>
        }
        pt={{
          root: { style: { fontFamily: "Lato, sans-serif" } },
          content: {
            className: " grid sm:grid-cols-2",
          },
        }}>
        <h2 className="font-bold mb-4 col-span-full">Facilities provided</h2>
        {facilities.map((f) => (
          <label key={f} className="flex gap-4 items-center">
            <input
              type="checkbox"
              className="p-checkbox"
              value={f}
              id={f}
              {...form.facilities}
            />
            {f}
          </label>
        ))}

        <h2 className="font-bold mt-8 mb-4 col-span-full">Category</h2>
        {categories.map((c) => (
          <label key={c} className="flex gap-4 items-center">
            <input
              type="radio"
              className="p-radio scale-125"
              value={c}
              id={c}
              {...form.category}
            />
            {c}
          </label>
        ))}
      </Fieldset>

      <Fieldset
        legend={
          <b className="text-ink flex items-center gap-3">Select 1-6 Images</b>
        }
        pt={{
          root: { style: { fontFamily: "Lato, sans-serif" } },
        }}>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          id="images"
          onChange={(e) => {
            clearImages();
            changeImages(e);
          }}
        />
        <Button
          type="button"
          label="Select Images"
          onClick={() => document.getElementById("images")?.click()}
          icon="pi pi-image"
          className="bg-grass w-fit"
        />
        {images.length ? (
          <p className="text-sm mt-2">Hover or Click to view a image</p>
        ) : null}
        <section>
          {images?.map(({ name, size, url }) => (
            <div key={name} className="p-4">
              <Image height="200" width="200" src={url} preview />
              <p>{name}</p>
              <p>{(size / 2 ** 10).toFixed(2)} KB</p>
            </div>
          ))}
        </section>
      </Fieldset>
    </form>
  );
};
