import { FieldSetCustom } from "./FieldSetCustom";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { LocationSelector } from "./LocationSelector";
import { categories, facilities } from "../config/listform";
import { Image } from "primereact/image";
import useImagePreviewer from "@/hooks/useImagePreviewer";
import { Button } from "primereact/button";
import { useFormContext } from "./FormContainer";
import { useState } from "react";

export const IDDetails = () => {
  const list = useFormContext();
  return (
    <FieldSetCustom h1="Identification Details" icon="pi pi-user">
      <label htmlFor="name">Name</label>
      <InputText
        id="name"
        name="name"
        keyfilter={/[\w\s]+/i}
        defaultValue={list?.name}
      />
      <label htmlFor="description">Description</label>
      <InputTextarea
        id="description"
        name="description"
        rows={5}
        cols={30}
        defaultValue={list?.description}
      />
      <label htmlFor="pincode">Pincode</label>
      <LocationSelector />
    </FieldSetCustom>
  );
};

export const PriceFeatures = () => {
  const list = useFormContext();
  return (
    <FieldSetCustom h1="Pricing & Dimensions" icon="pi pi-home">
      <label htmlFor="price">Price Per day</label>
      <InputText
        id="price"
        name="price"
        keyfilter="money"
        defaultValue={list?.price}
      />
      <label htmlFor="discount">Discount per day</label>
      <InputText
        id="discount"
        name="discount"
        keyfilter="money"
        defaultValue={list?.discount}
      />
      <label htmlFor="width">Entrance Width (feet)</label>
      <InputText
        id="width"
        name="width"
        keyfilter="int"
        defaultValue={list?.width}
      />
      <label htmlFor="height">Entrance Height (feet)</label>
      <InputText
        id="height"
        name="height"
        keyfilter="int"
        defaultValue={list?.height}
      />
      <label htmlFor="area">Storage Area (sq. feet)</label>
      <InputText
        id="area"
        name="area"
        keyfilter="int"
        defaultValue={list?.area}
      />
    </FieldSetCustom>
  );
};

export const CategoryFacilites = () => {
  const list = useFormContext();
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
            //use optional chain for safe local storage access
            defaultChecked={list?.facilities?.includes(f)}
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
            defaultChecked={list?.category === c}
          />
          {c}
        </label>
      ))}
    </FieldSetCustom>
  );
};

export const ImageGridWithMetadata = ({
  images,
}: {
  images: ReturnType<typeof useImagePreviewer>["images"];
}) => {
  return (
    <section className="grid grid-cols-2 col-span-full">
      {images.map(({ name, size, url }) => (
        <div key={name} className="p-4">
          <Image height="200" width="200" src={url} preview />
          <p>{name}</p>
          <small className="text-gray-700">
            {(size / 2 ** 10).toFixed(2)} KB
          </small>
        </div>
      ))}
    </section>
  );
};

export const ImagePicker = () => {
  const { images, changeImages, clearImages } = useImagePreviewer();
  const list = useFormContext();
  const [previousImages, setPreviousImages] = useState(list?.images);
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
        <>
          <p className="text-sm mt-2">Hover or Click to view a image</p>
          <ImageGridWithMetadata images={images} />
        </>
      ) : null}

      <section className="col-span-full mt-6 md:grid grid-cols-2">
        <h1 className="text-blood col-span-full">Previously selected images</h1>
        {Array.isArray(previousImages) &&
          previousImages.map((url, i) => (
            <div key={i} className="p-4">
              <Image src={url} />
              {/* to send new updates to prev images in formdata */}
              <input name="previousImages" hidden defaultValue={url} />
              <Button
                type="button"
                label="Remove"
                icon="pi pi-trash"
                className="text-xs bg-blood w-full"
                onClick={() => {
                  setPreviousImages(previousImages.filter((_, j) => i !== j));
                }}
              />
            </div>
          ))}
      </section>
    </FieldSetCustom>
  );
};
