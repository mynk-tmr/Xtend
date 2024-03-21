import { Listing } from "@/types/listing";
import { apiclient } from "@/lib/apiclient";
import { ActionFunctionArgs } from "react-router-dom";

export async function addListAction({ request, params }: ActionFunctionArgs) {
  const form = await request.formData();
  const data = Object.fromEntries(form) as unknown as Listing;
  if (data.name.length < 3)
    return { error: "Name should be at least 3 characters" };
  if (data.description.length < 10)
    return { error: "Description should be at least 10 characters" };
  if (data.price < 1) return { error: "Price should be atleast 1" };
  if (Number(data.discount) > Number(data.price))
    return { error: "Discount should be less than price" };
  if (data.width < 1) return { error: "Width should be atleast 1" };
  if (data.height < 1) return { error: "Height should be atleast 1" };
  if (data.area < 1) return { error: "Area should be atleast 1" };
  if (!data.state) return { error: "State is required" };
  if (!data.city) return { error: "City is required" };
  if (!data.pincode) return { error: "Pincode is required" };
  if (!data.locality) return { error: "Locality is required" };
  if (!data.category) return { error: "Category is required" };
  if (!data.facilities) return { error: "Atleast 1 Facility is required" };

  //@ts-expect-error name exists on fileList objects
  const l1 = form.getAll("images").filter(({ name }) => name).length;
  const l2 = form.getAll("previousImages").length || 0;
  const length = l1 + l2;
  if (length > 6 || length < 1) return { error: "Select 1 to 6 images" };

  try {
    if (request.method === "POST") {
      await apiclient.post("listings/add", {
        body: form,
      });
    } else if (request.method === "PUT") {
      await apiclient.put(`listings/add/${params.id}`, {
        body: form,
      });
    }
  } catch (e) {
    return { error: "Couldn't save listing." };
  }
  return { ok: true };
}
