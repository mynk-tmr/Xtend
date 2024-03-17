import { Fieldset } from "primereact/fieldset";

export const LayoutAuth = ({
  heading,
  form,
}: {
  heading: string;
  form: JSX.Element;
}) => {
  return (
    <Fieldset
      legend={heading}
      pt={{ legend: { className: "bg-black w-full text-white" } }}
      className="p-4 w-fit mx-auto [&_input]:opacity-80">
      {form}
    </Fieldset>
  );
};
