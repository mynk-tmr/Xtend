import { Fieldset } from "primereact/fieldset";

export const FieldSetCustom = ({
  h1,
  icon,
  children,
}: {
  h1: string;
  icon: string;
  children: React.ReactNode;
}) => {
  return (
    <Fieldset
      legend={
        <header className="bg-success flex gap-3 px-6 py-2 rounded-md">
          <h1>{h1}</h1>
          <i className={`align-middle ${icon}`}></i>
        </header>
      }
      pt={{
        root: { style: { fontFamily: "Lato, sans-serif" } },
        content: {
          className:
            "grid gap-4 xs:grid-cols-[1fr_2fr] items-center [&_input]:py-2 [&_label]:text-sm",
        },
      }}>
      {children}
    </Fieldset>
  );
};
