import { User } from "@/types/user";
import { api } from "../services/api";

export async function signInAction({ request }: { request: Request }) {
  const f = await request.formData();
  const data = Object.fromEntries(f) as { email: string; password: string };
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
}

export async function updateUserInfoAction({ request }: { request: Request }) {
  const f = await request.formData();
  const data = Object.fromEntries(f) as User & { password: string };
  if (data.email && !data.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g))
    return { error: "Invalid email" };
  if (data.password && data.password.length < 8)
    return { error: "Password must be atleast 8 characters long" };
  if (data.fullname && !data.fullname.match(/^[a-zA-Z\s]*$/i))
    return { error: "Invalid name" };
  try {
    await api.update(f);
  } catch (e) {
    return { error: "Couldn't update profile." };
  }
  return { ok: true };
}
