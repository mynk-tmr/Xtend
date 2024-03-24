import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";
import { Form, useNavigation } from "react-router-dom";
import logosrc from "@/common/assets/logo.png";
import { SVGCloudBackground } from "@/common/components/SVGCloudBackground";
import { Password } from "primereact/password";
import { useSubmissionEffect } from "../../../hooks/useSubmissionEffect";
import { Checkbox } from "primereact/checkbox";
import { useAppContext } from "@/providers/AppContextProvider";

export const FormContainer = ({ children }: { children: React.ReactNode }) => {
  const { verifyUser } = useAppContext();
  useSubmissionEffect(verifyUser, "");
  return (
    <>
      <Fieldset
        legend="Welcome"
        className="w-fit bg-white/30 mx-auto mt-24 xs:mt-12"
        pt={{ legend: { className: "text-center text-2xl px-8 bg-white/30" } }}>
        <h1 className="mx-auto w-fit mb-6">
          <img src={logosrc} alt="logo" />
        </h1>
        <Form method="post" className="[&_input]:py-0 grid gap-4 m-8">
          {children}
        </Form>
      </Fieldset>
      <SVGCloudBackground />
    </>
  );
};

export const FullNameField = () => (
  <div className="p-inputgroup">
    <span className="p-inputgroup-addon">
      <i className="pi pi-user"></i>
    </span>
    <InputText
      name="fullname"
      keyfilter={/[\w\s]+/i}
      placeholder="Full Name"
      aria-label="Full Name"
    />
  </div>
);

export const EmailField = () => (
  <div className="p-inputgroup">
    <span className="p-inputgroup-addon">
      <i className="pi pi-envelope"></i>
    </span>
    <InputText
      name="email"
      keyfilter="email"
      placeholder="Email"
      aria-label="Email"
    />
  </div>
);

export const PasswordField = () => (
  <div className="p-inputgroup">
    <span className="p-inputgroup-addon">
      <i className="pi pi-lock"></i>
    </span>
    <Password
      name="password"
      feedback={false}
      toggleMask={true}
      tooltip="Alteast 8 length"
      tooltipOptions={{ position: "top" }}
      placeholder="Password"
    />
  </div>
);

export const LoginButton = ({ text }: { text: string }) => {
  const { state } = useNavigation();
  const isubmitting = state === "submitting";
  return (
    <Button className="w-full flex justify-center">
      {isubmitting ? <i className="pi pi-spin pi-spinner"></i> : text}
    </Button>
  );
};

export const ForgotPasswordCheckbox = ({
  forgotPassword,
  setForgotPassword,
}: {
  forgotPassword: boolean;
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <label
      htmlFor="forgotPassword"
      className="cursor-pointer py-1 flex items-center gap-3 ml-auto">
      <Checkbox
        inputId="forgotPassword"
        className="scale-110"
        checked={forgotPassword}
        onChange={() => setForgotPassword(!forgotPassword)}
      />
      Forgot My Password
    </label>
  );
};
