import { Button } from "primereact/button";
import { UserNameField, EmailField, PasswordField } from "./FormElements";
import { useOutletContext } from "react-router-dom";
import { api } from "../services/api";
import { FormType } from "./FormProvider";
import { RegistrationValues } from "../types/creds";

const RegistrationForm = () => {
  const { register, errors, handleSubmit } =
    useOutletContext() as FormType<RegistrationValues>;
  return (
    <form
      noValidate
      onSubmit={handleSubmit(api.register)}
      className="rounded-md flex flex-col my-3 gap-4 w-fit *:flex *:flex-col *:gap-2">
      <UserNameField errors={errors} register={register} />
      <EmailField errors={errors} register={register} />
      <PasswordField errors={errors} register={register} />
      <Button label="Register" />
    </form>
  );
};

export default RegistrationForm;
