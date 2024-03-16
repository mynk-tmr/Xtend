import { Chip } from "primereact/chip";
import { Fieldset } from "primereact/fieldset";

const perks = [
  {
    color: "bg-ink",
    icon: "pi pi-thumbs-up",
    title: "Convenience",
    feats: [
      "Rent on your own terms",
      "Minimal Paperwork & Quick Response",
      "Our eXtended Services help you in onboarding",
    ],
  },
  {
    color: "bg-love",
    icon: "pi pi-shield",
    title: "Safe and Transparent",
    feats: [
      "Verified hosts and genuine renters",
      "No hidden fees, no security deposit",
      "Constant monitoring of user grievances",
    ],
  },
  {
    color: "bg-teal-600",
    icon: "pi pi-wallet",
    title: "Affordable",
    feats: [
      "Guaranteed lowest price",
      "Search storages as per your budget",
      "Diverse storage options",
    ],
  },
];

export const PerksSection = () => {
  return (
    <section>
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">
          Why are we <b className="text-love">loved</b> ?
        </h1>
        <Chip
          label="We make the process of renting and hosting as simple as possible"
          className="bg-success m-4"></Chip>
      </header>
      <main className="flex flex-wrap gap-12 p-6 pb-16 *:grow">
        {perks.map((perk) => (
          <Fieldset
            key={perk.title}
            pt={{
              legend: {
                className: `${perk.color} text-white rounded-full mx-auto`,
              },
            }}
            legend={
              <h2>
                <i className={`${perk.icon} animate-pulse mr-2`} /> {perk.title}
              </h2>
            }>
            <ul>
              {perk.feats.map((feat) => (
                <li key={feat}>
                  <i className="pi pi-check-circle text-grass p-1 ml-4"></i>
                  {feat}
                </li>
              ))}
            </ul>
          </Fieldset>
        ))}
      </main>
    </section>
  );
};
