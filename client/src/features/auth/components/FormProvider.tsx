import { FieldValues, useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";

export type FormType<T extends FieldValues> = {
  register: ReturnType<typeof useForm<T>>["register"];
  errors: ReturnType<typeof useForm<T>>["formState"]["errors"];
  dirtyFields: ReturnType<typeof useForm<T>>["formState"]["dirtyFields"];
  handleSubmit: ReturnType<typeof useForm<T>>["handleSubmit"];
};

export const FormProvider = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm();

  return (
    <Outlet
      context={{
        register,
        errors,
        dirtyFields,
        handleSubmit,
      }}
    />
  );
};
