import { Listing } from "@/common/types/listing";
import { apiclient } from "@/lib/apiclient";

export async function addListAction({ request }: { request: Request }) {
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
  if (form.getAll("images").length < 1 || form.getAll("images").length > 6)
    return { error: "Select 1 to 6 images" };

  try {
    await apiclient.post("listings/add", {
      body: form,
    });
  } catch (e) {
    return { error: "Couldn't add listing." };
  }
  return { ok: true };
}
