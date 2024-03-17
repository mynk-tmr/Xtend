import { Button } from "primereact/button";
import { useState } from "react";
import {
  ForgotPasswordCheckbox,
  PasswordField,
  UniqueIdOREmailField,
} from "./FormElements";
import { Link, useOutletContext } from "react-router-dom";
import { api } from "../services/api";
import { FormType } from "./FormProvider";
import { LoginValues } from "../types/creds";

const LoginForm = () => {
  const { register, errors, handleSubmit } =
    useOutletContext() as FormType<LoginValues>;
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (forgotPassword) return;
        api.login({
          [data.usercreds.includes("@") ? "email" : "uniqueID"]: data.usercreds,
          password: data.password,
        });
      })}
      noValidate
      className="rounded-md flex flex-col mx-3 gap-4 *:flex *:flex-col *:gap-2">
      <UniqueIdOREmailField {...{ register, errors, forgotPassword }} />
      <PasswordField {...{ register, errors, forgotPassword }} />
      <Button label={forgotPassword ? "Send Reset Link" : "Login"} />
      <div className="!flex-row justify-between items-center">
        <Link to="../register" className="text-blood font-bold hover:text-love">
          No Account ?
        </Link>
        <ForgotPasswordCheckbox {...{ forgotPassword, setForgotPassword }} />
      </div>
    </form>
  );
};

export default LoginForm;
