import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import logoUrl from "@/common/assets/logo.png";
import { SVGCloudBackground } from "@/common/components/SVGCloudBackground";

export const PageNotFound = () => {
  const goto = useNavigate();
  return (
    <section className="fixed inset-0 bg-white grid gap-y-8 place-content-center px-6">
      <img src={logoUrl} alt="logo" className="mx-auto" />
      <b className="text-2xl">The page you are looking for does not exist.</b>
      <Button
        icon="pi pi-home"
        label="Go to Home"
        className="bg-success text-black"
        onClick={() => goto("/", { replace: true })}></Button>
      <SVGCloudBackground />
    </section>
  );
};