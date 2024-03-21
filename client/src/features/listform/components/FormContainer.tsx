import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import {
  CategoryFacilites,
  IDDetails,
  PriceFeatures,
  ImagePicker,
} from "./FormSections";
import { Button } from "primereact/button";
import { RouteActionData } from "@/types/actions";
import { createContext, useContext, useEffect } from "react";
import { useToast } from "@/providers/ToastProvider";
import { Listing } from "@/types/listing";

const FormContext = createContext<Listing | null>(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = () => useContext(FormContext);

export const FormContainer = ({
  defaultValues = null,
}: {
  defaultValues?: Listing | null;
}) => {
  const res = useActionData() as RouteActionData;
  const toast = useToast();
  const { state } = useNavigation();
  const goto = useNavigate();
  const submitText = defaultValues ? "Update Listing" : "Add Listing";

  useEffect(() => {
    if (res?.ok) {
      toast.success("Saved your listing");
      goto("/dashboard");
    } else if (res?.error) toast.error(res.error);
    return () => {
      if (res?.ok) res.ok = false;
      if (res?.error) res.error = "";
    };
  }, [res, toast, goto]);

  return (
    <FormContext.Provider value={defaultValues}>
      <Form
        encType="multipart/form-data"
        method={defaultValues ? "put" : "post"}
        className="grid md:grid-cols-2 gap-8">
        <IDDetails />
        <PriceFeatures />
        <CategoryFacilites />
        <ImagePicker />
        <Button className="bg-fuchsia-600 h-[5ch]">
          {state === "submitting" ? (
            <i className="pi pi-spin pi-spinner m-2"></i>
          ) : (
            <span>
              <i className="pi pi-save m-2"></i> {submitText}
            </span>
          )}
        </Button>
      </Form>
    </FormContext.Provider>
  );
};
