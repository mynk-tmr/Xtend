import { FormProvider } from "../components/FormProvider";
import { LayoutAuth } from "../components/LayoutAuth";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";

export const authRoutes = {
  path: "/auth",
  Component: FormProvider,
  children: [
    {
      path: "register",
      element: (
        <LayoutAuth
          heading="Register your account"
          form={<RegistrationForm />}
        />
      ),
    },
    {
      path: "login",
      element: (
        <LayoutAuth heading="Login to your account" form={<LoginForm />} />
      ),
    },
  ],
};
