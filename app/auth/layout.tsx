import { checkNoAuth } from "@/lib/check-methods";

export default async function Layout(props: { children: React.ReactNode }) {
  await checkNoAuth();
  return props.children;
}
