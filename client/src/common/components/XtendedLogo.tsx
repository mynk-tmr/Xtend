import logoUrl from "@/common/assets/logo.png";
import { Link } from "react-router-dom";

export const XtendedLogo = () => {
  return (
    <Link to="/" className="mx-auto block w-fit">
      <img src={logoUrl} alt="logo" />
    </Link>
  );
};
