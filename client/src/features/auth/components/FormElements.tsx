import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { useForm } from "react-hook-form";
import { LoginValues } from "../types/creds";

type FieldType = {
  errors: ReturnType<typeof useForm<LoginValues>>["formState"]["errors"];
  register: ReturnType<typeof useForm<LoginValues>>["register"];
  forgotPassword?: boolean;
};

export const HelperSmallText = ({
  message,
  err,
}: {
  message: React.ReactNode;
  err: boolean;
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

export const EmailField = ({ errors, register }: FieldType) => (
  <span>
    <label htmlFor="email">Email</label>
    <InputText
      id="email"
      type="email"
      keyfilter="email"
      {...register("email", {
        required: true,
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "",
        },
      })}
    />
    <HelperSmallText
      message="Enter valid email address"
      err={Boolean(errors?.email)}
    />
  </span>
);

export const PasswordField = ({
  errors,
  register,
  forgotPassword,
}: FieldType) => {
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
        err={Boolean(errors?.password)}
      />
    </span>
  );
};

export const ForgotPasswordCheckbox = ({
  forgotPassword,
  setForgotPassword,
}: {
  forgotPassword: boolean;
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <span className="flex w-full gap-2 py-4 items-center justify-end">
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
