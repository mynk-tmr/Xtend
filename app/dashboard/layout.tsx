import { checkAuth } from "@/lib/check-methods";

export default async function Layout(props: { children: React.ReactNode }) {
  await checkAuth();
  return props.children;
}
