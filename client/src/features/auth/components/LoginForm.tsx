import { Card } from "primereact/card";
import logoUrl from "@/common/assets/logo.png";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { LoginValues } from "../types/creds";
import { useState } from "react";
import {
  EmailField,
  ForgotPasswordCheckbox,
  PasswordField,
} from "./FormElements";
import { api } from "../services/api";

const SkewedBackground = () => (
  <section className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl -translate-x-1" />
);

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <section className="relative max-w-prose">
      <SkewedBackground />
      <Card
        title={
          <span>
            Login to <img src={logoUrl} alt="logo" className="inline" />
          </span>
        }
        pt={{
          title: {
            className: "text-2xl text-center",
          },
          root: {
            className: "relative bg-white shadow-lg xs:px-10 xs:py-5",
          },
        }}>
        <form
          onSubmit={handleSubmit(api.login)}
          noValidate
          className="px-4 *:flex *:flex-col *:gap-4 space-y-4 [&_input]:py-2 [&_label]:text-sm">
          <EmailField {...{ errors, register }} />
          <PasswordField {...{ errors, register, forgotPassword }} />
          <section
            aria-label="login options"
            className="xs:!flex-row flex-wrap mt-10">
            <ForgotPasswordCheckbox
              {...{ forgotPassword, setForgotPassword }}
            />
            <Button
              label={forgotPassword ? "Send Reset Link" : "Login"}
              icon={forgotPassword ? "pi pi-envelope" : "pi pi-sign-in"}
              className="px-5 w-fit"
            />
            <div className="xs:w-[2px] bg-gray-400" />
            <Button
              label="Continue with Google"
              icon="pi pi-google"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            />
          </section>
        </form>
      </Card>
    </section>
  );
};
