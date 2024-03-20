import { Form, useActionData } from "react-router-dom";
import {
  CategoryFacilites,
  IDDetails,
  PriceFeatures,
  ImagePicker,
} from "./FormSections";
import { Button } from "primereact/button";
import { RouteActionData } from "@/common/types/actions";
import { useEffect } from "react";
import { useToast } from "@/providers/ToastProvider";

export const FormContainer = () => {
  const res = useActionData() as RouteActionData;
  const toast = useToast();
  useEffect(() => {
    if (res?.ok) toast.success("Listing Added");
    else if (res?.error) toast.error(res.error);
  }, [res, toast]);
  return (
    <Form
      encType="multipart/form-data"
      method="post"
      className="grid md:grid-cols-2 gap-8">
      <IDDetails />
      <PriceFeatures />
      <CategoryFacilites />
      <ImagePicker />
      <Button label="Add Listing" className="bg-love" />
    </Form>
  );
};
