import { ActionFunction, Link } from "react-router-dom";
import { useState } from "react";
import {
  EmailField,
  ForgotPasswordCheckbox,
  FormContainer,
  LoginButton,
  PasswordField,
} from "./FormElements";
import { User } from "@/types/user";
import { api } from "../services/api";

export const LoginForm = () => {
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <FormContainer>
      <EmailField />
      {forgotPassword ? (
        <b className="text-sm">
          We will send you a link to reset your password
        </b>
      ) : (
        <PasswordField />
      )}
      <LoginButton text={forgotPassword ? "Send Link" : "Sign In"} />
      <Link
        to="/auth/register"
        className="text-blood font-bold underline underline-offset-2">
        Register Instead
      </Link>
      <ForgotPasswordCheckbox {...{ forgotPassword, setForgotPassword }} />
    </FormContainer>
  );
};

const action: ActionFunction = async ({ request }) => {
  const f = await request.formData();
  const data = Object.fromEntries(f) as User & { password: string };
  if (!data.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g))
    return { error: "Invalid email" };
  if (data.password.length < 8)
    return { error: "Password must be atleast 8 characters long" };
  try {
    await api.login(data);
  } catch (e) {
    return { error: "Invalid credentials" };
  }
  return { ok: true };
};

LoginForm.action = action;
