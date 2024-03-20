import { FieldSetCustom } from "./FieldSetCustom";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { LocationSelector } from "./LocationSelector";
import { categories, facilities } from "../config/listform";
import { Image } from "primereact/image";
import useImagePreviewer from "@/hooks/useImagePreviewer";
import { Button } from "primereact/button";

export const IDDetails = () => {
  return (
    <FieldSetCustom h1="Identification Details" icon="pi pi-user">
      <label htmlFor="name">Name</label>
      <InputText id="name" name="name" keyfilter={/[\w\s]+/i} />
      <label htmlFor="description">Description</label>
      <InputTextarea id="description" name="description" rows={5} cols={30} />
      <label htmlFor="pincode">Pincode</label>
      <LocationSelector />
    </FieldSetCustom>
  );
};

export const PriceFeatures = () => {
  return (
    <FieldSetCustom h1="Pricing & Dimensions" icon="pi pi-home">
      <label htmlFor="price">Price Per day</label>
      <InputText id="price" name="price" keyfilter="money" />
      <label htmlFor="discount">Discount per day</label>
      <InputText id="discount" name="discount" keyfilter="money" />
      <label htmlFor="width">Entrance Width (feet)</label>
      <InputText id="width" name="width" keyfilter="int" />
      <label htmlFor="height">Entrance Height (feet)</label>
      <InputText id="height" name="height" keyfilter="int" />
      <label htmlFor="area">Storage Area (sq. feet)</label>
      <InputText id="area" name="area" keyfilter="int" />
    </FieldSetCustom>
  );
};

export const CategoryFacilites = () => {
  return (
    <FieldSetCustom h1="Category & Facilities" icon="pi pi-wallet">
      <h2 className="font-bold mb-4 col-span-full">Facilities provided</h2>
      {facilities.map((f) => (
        <label key={f} className="flex gap-4 items-center">
          <input
            type="checkbox"
            className="p-checkbox accent-love"
            value={f}
            id={f}
            name="facilities"
          />
          {f}
        </label>
      ))}

      <h2 className="font-bold mt-8 mb-4 col-span-full">Category</h2>
      {categories.map((c) => (
        <label key={c} className="flex gap-4 items-center">
          <input
            type="radio"
            className="p-radio accent-ink scale-125"
            value={c}
            id={c}
            name="category"
          />
          {c}
        </label>
      ))}
    </FieldSetCustom>
  );
};

export const ImagePicker = () => {
  const { images, changeImages, clearImages } = useImagePreviewer();
  return (
    <FieldSetCustom h1="Images (max 6)" icon="pi pi-image">
      <input
        name="images"
        id="images"
        type="file"
        accept="image/*"
        className="hidden"
        multiple
        onChange={(e) => {
          clearImages();
          changeImages(e);
        }}
      />
      <Button
        type="button"
        label="Select Images"
        onClick={() => document.getElementById("images")?.click()}
      />
      {images.length ? (
        <p className="text-sm mt-2">Hover or Click to view a image</p>
      ) : null}
      <section className="grid grid-cols-2 col-span-full">
        {images?.map(({ name, size, url }) => (
          <div key={name} className="p-4">
            <Image height="200" width="200" src={url} preview />
            <p>{name}</p>
            <small className="text-gray-700">
              {(size / 2 ** 10).toFixed(2)} KB
            </small>
          </div>
        ))}
      </section>
    </FieldSetCustom>
  );
};
