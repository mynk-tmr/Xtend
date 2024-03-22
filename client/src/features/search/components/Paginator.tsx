import { ReactNode } from "react";
import { Link } from "react-router-dom";

const CustomLink = ({
  to,
  icon,
}: {
  to: string | undefined;
  icon: ReactNode;
}) =>
  to ? (
    <Link className="rounded-md m-2 bg-yellow px-2 py-1" to={to}>
      {icon}
    </Link>
  ) : null;

const Pagination = ({
  links,
}: {
  links: Record<string, string> | undefined;
}) => {
  if (!links) return null;
  return (
    <section className="flex justify-center">
      <nav
        aria-description="navigate through pages using this"
        className="mt-8">
        <CustomLink to={links.first} icon={"first"} />
        <CustomLink
          to={links.prev}
          icon={<i className="pi pi-chevron-left"></i>}
        />
        <CustomLink
          to={links.next}
          icon={<i className="pi pi-chevron-right"></i>}
        />
        <CustomLink to={links.last} icon={"last"} />
      </nav>
    </section>
  );
};

export default Pagination;
