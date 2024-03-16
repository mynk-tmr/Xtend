import { Link } from "react-router-dom";
import { Chip } from "primereact/chip";
import logoUrl from "@/common/assets/logo.png";
import pfpUrl from "../assets/pfp.jpeg";

type LinksProps = {
  links: {
    label: React.ReactNode;
    labelIcon?: string;
    to: string;
  }[];
};

type LinksListProps = {
  title: string;
  icon: string;
} & LinksProps;

const Links = (props: LinksProps) =>
  props.links.map((link, i) => (
    <li key={i}>
      <Link to={link.to} className="group">
        <i className={link.labelIcon ?? "pi pi-angle-right"}></i>{" "}
        <span className="ml-2 group-hover:underline ">{link.label}</span>
      </Link>
    </li>
  ));

const LinksList = (props: LinksListProps) => (
  <>
    <Chip
      label={props.title}
      className="tracking-widest bg-white text-black mb-3 flex items-center"
      icon={props.icon}
    />
    <ul>
      <Links links={props.links} />
    </ul>
  </>
);

export const BottomNavLinks = () => {
  return (
    <footer className="text-white bg-teal-800">
      <section className="flex flex-wrap items-center *:p-8 ">
        <img src={logoUrl} alt="logo" />
        <a href="https://www.linkedin.com/in/mayank-tomar-9bba0613b">
          <img
            src={pfpUrl}
            alt="Mayank's Picture"
            title="Mayank's Picture"
            className="size-16 md:size-28 rounded-full"
          />
        </a>
        <p className="mt-2 text-sm">
          Xtended Space is an online marketplace for storage spaces. This site
          is created for the purpose of skill showcase.
        </p>
      </section>
      <section className="text-sm lg:text-base flex flex-wrap *:grow *:p-8">
        <nav aria-label="links to location specific listings">
          <LinksList
            title="LOCATIONS"
            icon="pi pi-map-marker"
            links={[
              { label: "Gurgaon", to: "/" },
              { label: "Ghaziabad", to: "/" },
              { label: "Noida", to: "/" },
              { label: "Delhi", to: "/" },
              { label: "Faridabad", to: "/" },
            ]}
          />
        </nav>
        <nav aria-label="quick links to navigate site">
          <LinksList
            title="QUICK LINKS"
            icon="pi pi-link"
            links={[
              { label: "For Hosts", to: "/" },
              { label: "For Renters", to: "/" },
              { label: "About Us", to: "/" },
              { label: "Contact Us", to: "/" },
            ]}
          />
        </nav>
        <nav aria-label="seek help links">
          <LinksList
            title="GET HELP"
            icon="pi pi-question"
            links={[
              { label: "FAQs", to: "/" },
              { label: "Terms & Conditions", to: "/" },
              { label: "Privacy Policy", to: "/" },
              { label: "Canellation Policy", to: "/" },
            ]}
          />
        </nav>
        <address className="not-italic">
          <LinksList
            title="CONTACT US"
            icon="pi pi-hashtag"
            links={[
              {
                label: "+91 1234567890",
                to: "tel:1234567890",
                labelIcon: "pi pi-whatsapp",
              },
              {
                label: "jLjVW@example.com",
                to: "mailto:jLjVW@example.com",
                labelIcon: "pi pi-envelope",
              },
            ]}
          />
        </address>
      </section>
      <section className="bg-gray-100 px-4 flex items-center justify-between text-black">
        <p className="text-sm text-balance">
          © 2024 Xtended Space — created by <b>Mayank Tomar</b>
        </p>
        <nav
          aria-label="Mayank's social media & contact links"
          className="*:p-2 [&>i]:text-xl min-w-[13ch]">
          <b className="block md:inline">Contact me</b>
          <i className="pi pi-github"></i>
          <i className="pi pi-linkedin"></i>
          <i className="pi pi-instagram"></i>
        </nav>
      </section>
    </footer>
  );
};
