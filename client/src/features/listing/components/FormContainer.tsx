import { useSubmissionEffect } from "@/hooks/useSubmissionEffect";
import { Listing } from "@/types/listing";
import { Button } from "primereact/button";
import { createContext, useContext, useLayoutEffect, useRef } from "react";
import { Form, useNavigate, useNavigation } from "react-router-dom";
import {
  CategoryFacilites,
  IDDetails,
  ImagePicker,
  PriceFeatures,
} from "./FormSections";
import fromEntriesv2 from "@/lib/fromEntriesv2";

const FormContext = createContext<Listing | null>(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = () => useContext(FormContext);

export const FormContainer = ({
  defaultValues = null,
}: {
  defaultValues?: Listing | null;
}) => {
  const { state } = useNavigation();
  const goto = useNavigate();
  const submitText = defaultValues ? "Update Listing" : "Add Listing";
  const formRef = useRef<HTMLFormElement>(null);

  useSubmissionEffect(() => {
    goto("/dashboard/listings");
    localStorage.removeItem("draft");
  }, "Listing created");

  useLayoutEffect(() => () => {
    //save form before unmounting
    const fd = new FormData(formRef.current!);
    localStorage.setItem("draft", JSON.stringify(fromEntriesv2(fd.entries())));
  });

  return (
    <FormContext.Provider
      value={defaultValues ?? JSON.parse(localStorage.getItem("draft")!)}>
      <Form
        ref={formRef}
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
