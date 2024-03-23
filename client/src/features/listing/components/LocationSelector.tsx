import { useMutation } from "@tanstack/react-query";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { useToast } from "@/providers/ToastProvider";
import { postalapi } from "@/lib/postalapi";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useFormContext } from "./FormContainer";

const PincodeField = ({
  mutate,
  loading,
}: {
  mutate: () => void;
  loading: boolean;
}) => {
  const list = useFormContext();
  return (
    <div className="p-inputgroup">
      <InputText
        keyfilter={/^[0-9]$/}
        maxLength={6}
        id="pincode"
        name="pincode"
        defaultValue={list?.pincode}
      />
      <Button
        type="button"
        onClick={() => mutate()}
        className="p-inputgroup-addon">
        <i className={`pi ${loading ? "pi-spin pi-spinner" : "pi-search"}`}></i>
      </Button>
    </div>
  );
};

export const LocationSelector = () => {
  const toast = useToast();
  const list = useFormContext();
  const { mutate, isPending, data } = useMutation({
    mutationFn: async () => {
      const field = document.getElementById("pincode") as HTMLInputElement;
      return await postalapi(field.value);
    },
    onError: () => toast.error("Invalid Pincode"),
  });
  const [locality, setLocality] = useState("");
  return (
    <>
      <PincodeField mutate={mutate} loading={isPending} />
      <label htmlFor="state">State</label>
      <InputText
        id="state"
        name="state"
        value={data?.state || list?.state || ""}
        readOnly
        placeholder="Provide Pincode"
      />
      <label htmlFor="state">City</label>
      <InputText
        id="city"
        name="city"
        value={data?.city || list?.city || ""}
        readOnly
        placeholder="Provide Pincode"
      />
      <label htmlFor="locality">Select Locality</label>
      <Dropdown
        inputId="locality"
        options={data?.localities || [list?.locality || ""]}
        name="locality"
        placeholder={data?.localities ? "Open to Select" : "Provide a Pincode"}
        onChange={(e) => setLocality(e.value)}
        value={locality || list?.locality || ""}
      />
    </>
  );
};
