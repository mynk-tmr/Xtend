import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { useNavigate } from "react-router-dom";

export const HeroIntro = () => {
  const goto = useNavigate();
  return (
    <article className="grid gap-y-12">
      <h1 className="text-4xl font-bold">
        Turn your <b className="text-grass">eXTRA SPACE</b> into{" "}
        <b className="text-navy">eXTRA CASH</b>
        <br />
        Or rent storage for your <b className="text-love">eXTRA items</b>
      </h1>
      <p>
        Every storage on our platform is verified by our team to be <b>safe</b>,{" "}
        <b>affordable</b> and <b>convenient</b>
      </p>
      <Fieldset
        legend={
          <span>
            How can we assist you ?{" "}
            <i className="pi pi-heart-fill animate-bounce text-love" />
          </span>
        }>
        <div className="flex flex-wrap gap-2">
          <Button
            size="small"
            label="I want to list my storage"
            className="bg-grass text-base hover:opacity-90"
            icon="pi pi-home"
            onClick={() => goto("/listing/create")}
          />
          <Button
            size="small"
            label="I want to rent storage"
            className="bg-navy text-base hover:opacity-90"
            icon="pi pi-shopping-cart"
            onClick={() => goto("/search")}
          />
        </div>
      </Fieldset>
    </article>
  );
};
