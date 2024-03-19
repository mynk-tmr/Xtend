import { useState } from "react";
import { Steps } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
import { useForm } from "react-hook-form";
import { Listing } from "@/common/types/listing";
import { IDSection } from "./IDSection";

export const FormContainer = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const formik = useForm<Listing>();
  const items: MenuItem[] = [
    {
      label: "Identication Details",
    },
    {
      label: "Pricing and Features",
    },
    {
      label: "Upload Images",
    },
    {
      label: "Confirmation",
    },
  ];

  return (
    <section>
      <Steps
        model={items}
        activeIndex={activeIndex}
        onSelect={(e) => setActiveIndex(e.index)}
        readOnly={false}
      />
      <form onSubmit={formik.handleSubmit((dt) => console.log(dt))}>
        {activeIndex === 0 && <IDSection formik={formik} />}
      </form>
    </section>
  );
};
