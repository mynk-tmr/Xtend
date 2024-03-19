import { Listing } from "@/common/types/listing";
import usePostalAPI from "@/hooks/usePostalAPI";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { UseFormReturn } from "react-hook-form";

export const IDSection = ({
  formik,
}: {
  formik: UseFormReturn<Listing, undefined>;
}) => {
  const { isFetching, localities, refetch } = usePostalAPI(
    formik.getValues,
    formik.setValue
  );

  return (
    <section className="grid gap-5">
      <div className="flex p-input-group">
        <span className="p-inputgroup-addon">
          <i className="pi pi-id-card"></i>
        </span>
        <InputText
          placeholder="Name of Listing"
          aria-label="Name of Listing"
          className="w-full"
          keyfilter={/^[a-zA-Z\s]*$/i}
          {...formik.register("name", {
            required: true,
            minLength: { value: 9, message: "" },
          })}
        />
      </div>

      <div className="flex p-input-group">
        <span className="p-inputgroup-addon">
          <i className="pi pi-megaphone"></i>
        </span>
        <InputTextarea
          placeholder="Description"
          rows={5}
          aria-label="A description of the listing"
          className="w-full"
          {...formik.register("description", {
            required: true,
            minLength: { value: 20, message: "" },
          })}
        />
      </div>

      <div className="flex p-input-group">
        <span className="p-inputgroup-addon">
          <i className="pi pi-map"></i>
        </span>
        <InputText
          placeholder="Pincode"
          aria-label="pincode"
          className="w-full"
          keyfilter="num"
          maxLength={6}
          {...formik.register("address.pincode", {
            required: true,
          })}
        />
        <button
          type="button"
          disabled={isFetching}
          onClick={() => refetch()}
          className="p-inputgroup-addon bg-success w-[10ch]">
          {isFetching ? (
            <i className="pi pi-spin pi-spinner"></i>
          ) : localities ? (
            "Change"
          ) : (
            "Confirm"
          )}
        </button>
      </div>

      {localities && (
        <div className="flex gap-2 *:!text-black">
          <input
            className="p-tag p-2 bg-yellow"
            readOnly
            {...formik.register("address.city")}
          />
          <input
            className="p-tag p-2 bg-yellow"
            readOnly
            {...formik.register("address.state")}
          />
          <Dropdown
            options={localities}
            value={formik?.watch("address.locality")}
            placeholder="Select a Locality"
            focusInputRef={formik.register("address.locality").ref}
            onChange={(e) => formik.setValue("address.locality", e.value)}
          />
        </div>
      )}
    </section>
  );
};
