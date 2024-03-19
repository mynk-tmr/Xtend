import { useForm } from "react-hook-form";
import { Listing } from "@/common/types/listing";

export function useListForm() {
  const hookform = useForm<Listing>();
  const { register, getValues } = hookform;

  const name = register("name", {
    required: true,
    minLength: { value: 3, message: "Name should be at least 3 characters" },
  });
  const description = register("description", {
    required: true,
    minLength: {
      value: 10,
      message: "Description should be at least 10 characters",
    },
  });
  const images = register("images", {
    // validate: () => {
    //  const l = getValues("images").length;
    // if (l === 0 || l > 6) return "Images should be between 1 and 6";
    //},
  });
  const price = register("price", {
    required: true,
    min: { value: 1, message: "Price should be atleast 1" },
    valueAsNumber: true,
  });
  const discount = register("discount", {
    required: true,
    min: { value: 0, message: "Discount should be atleast 0" },
    validate: (dis) => {
      if (dis > getValues("price")) return "Discount should be less than price";
    },
    valueAsNumber: true,
  });
  const category = register("category", {
    required: true,
  });
  const facilities = register("facilities", {
    required: true,
  });
  const city = register("address.city", {
    required: true,
  });
  const state = register("address.state", {
    required: true,
  });
  const pincode = register("address.pincode", {
    required: true,
    validate: (pin) => {
      if (pin.length !== 6) return "Pincode should be of 6 digits";
    },
  });
  const locality = register("address.locality", {
    required: true,
  });
  const width = register("dimensions.width", {
    required: true,
    min: { value: 1, message: "Width should be atleast 1" },
    valueAsNumber: true,
  });
  const height = register("dimensions.height", {
    required: true,
    min: { value: 1, message: "Height should be atleast 1" },
    valueAsNumber: true,
  });
  const area = register("dimensions.area", {
    required: true,
    min: { value: 1, message: "Area should be atleast 1" },
    valueAsNumber: true,
  });

  return {
    hookform,
    name,
    description,
    images,
    price,
    discount,
    category,
    facilities,
    city,
    state,
    pincode,
    locality,
    width,
    height,
    area,
  };
}
