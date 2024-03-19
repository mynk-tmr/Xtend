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
