/* eslint-disable no-useless-escape */
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { FormType } from "./FormProvider";
import { LoginValues, RegistrationValues } from "../types/creds";

type FormElementsType = {
  errors: FormType<RegistrationValues>["errors"];
  register: FormType<RegistrationValues>["register"];
};

type FormElementsWithPasswordType = {
  errors:
    | FormType<LoginValues>["errors"]
    | FormType<RegistrationValues>["errors"];
  forgotPassword?: boolean;
  register:
    | FormType<LoginValues>["register"]
    | FormType<RegistrationValues>["register"];
};

export const HelperSmallText = ({
  message,
  err,
}: {
  message: React.ReactNode;
  err: FormElementsType["errors"][keyof FormElementsType["errors"]] | undefined;
}) => {
  if (err) {
    return (
      <small className="text-blood flex gap-2 items-center">
        <i className="pi pi-times-circle"></i>
        {message}
      </small>
    );
  }

  return (
    <small className="text-ink flex gap-2 items-center">
      <i className="pi pi-info-circle"></i>
      {message}
    </small>
  );
};

export const UserNameField = ({ errors, register }: FormElementsType) => (
  <span>
    <label htmlFor="username">Your Name</label>
    <InputText
      id="username"
      type="text"
      keyfilter={/^[a-z\. ]+$/i}
      className="p-inputtext-sm"
      {...register("username", {
        required: true,
        minLength: { value: 6, message: "" },
      })}
    />
    <HelperSmallText
      message="Atleast 6 alphanumeric characters"
      err={errors?.username}
    />
  </span>
);

export const EmailField = ({ errors, register }: FormElementsType) => (
  <span>
    <label htmlFor="email">Email</label>
    <InputText
      id="email"
      type="email"
      keyfilter="email"
      className="p-inputtext-sm"
      {...register("email", {
        required: true,
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "",
        },
      })}
    />
    <HelperSmallText message="Enter valid email address" err={errors?.email} />
  </span>
);

export const PasswordField = ({
  errors,
  register,
  forgotPassword,
}: FormElementsWithPasswordType) => {
  const { ref, ...rest } = register("password", {
    required: true,
    disabled: forgotPassword,
    minLength: { value: 8, message: "" },
  });

  if (forgotPassword) return null;

  return (
    <span>
      <label htmlFor="password">Password</label>
      <span>
        <Password
          pt={{
            root: { className: "w-full" },
            input: { className: "w-full" },
          }}
          inputId="password"
          className="p-inputtext-sm"
          toggleMask
          feedback={false}
          inputRef={ref}
          {...rest}
        />
      </span>
      <HelperSmallText
        message="Alteast 8 characters. Use letters, numbers & symbols"
        err={errors?.password}
      />
    </span>
  );
};

export const UniqueIdOREmailField = ({
  errors,
  register,
  forgotPassword,
}: FormElementsWithPasswordType) => (
  <span>
    <label htmlFor="usercreds" className="[&_u]:text-yellow-500">
      Enter your unique <b>userId</b> or registered <b>email</b>
    </label>
    <InputText
      id="usercreds"
      type="text"
      className="p-inputtext-sm"
      {...register("usercreds", {
        required: true,
      })}
    />
    <HelperSmallText
      message={
        forgotPassword
          ? "Your email will receive a reset link"
          : "This was assigned to you by us. Remember ?"
      }
      err={errors?.usercreds}
    />
  </span>
);

export const ForgotPasswordCheckbox = ({
  forgotPassword,
  setForgotPassword,
}: {
  forgotPassword: boolean;
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <span className="flex gap-2 items-center">
    <Checkbox
      inputId="forgotPassword"
      className="scale-110"
      checked={forgotPassword}
      onChange={() => setForgotPassword(!forgotPassword)}
    />
    <label htmlFor="forgotPassword" className="cursor-pointer py-1">
      Forgot My Password
    </label>
  </span>
);
