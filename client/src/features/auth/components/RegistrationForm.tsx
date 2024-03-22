import { ActionFunction } from "react-router-dom";
import {
  EmailField,
  FormContainer,
  FullNameField,
  LoginButton,
  PasswordField,
} from "./FormElements";
import { User } from "@/types/user";
import { api } from "../services/api";

export const RegistrationForm = () => {
  return (
    <FormContainer>
      <FullNameField />
      <EmailField />
      <PasswordField />
      <LoginButton text="Register" />
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
  if (!data.fullname.match(/^[a-z\s]*$/i)) return { error: "Invalid name" };
  try {
    await api.register(data);
  } catch (e) {
    return { error: "Couldn't create your Account" };
  }
  return { ok: true };
};

RegistrationForm.action = action;
