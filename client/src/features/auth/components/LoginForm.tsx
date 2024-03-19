import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";
import { Form, useActionData, useNavigation } from "react-router-dom";
import logosrc from "@/common/assets/logo.png";
import { SVGCloudBackground } from "@/common/components/SVGCloudBackground";
import { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Password } from "primereact/password";
import { useAppContext } from "@/providers/AppContextProvider";
import { useToast } from "@/providers/ToastProvider";
import { RouteActionData } from "@/common/types/actions";

export const LoginForm = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const { verifyUser } = useAppContext();
  const toast = useToast();
  const res = useActionData() as RouteActionData;

  useEffect(() => {
    if (res?.ok) verifyUser();
    else if (res?.error) toast.error(res.error);
  }, [res, toast, verifyUser]);

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
          <FormBody forgotPassword={forgotPassword} />
          <ForgotPasswordCheckbox {...{ forgotPassword, setForgotPassword }} />
        </Form>
      </Fieldset>
      <SVGCloudBackground />
    </>
  );
};

const FormBody = ({ forgotPassword }: { forgotPassword: boolean }) => (
  <>
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
    {!forgotPassword ? (
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-lock"></i>
        </span>
        <Password
          name="password"
          feedback={false}
          toggleMask
          tooltip="Alteast 8 length"
          tooltipOptions={{ position: "top" }}
          placeholder="Password"
          aria-label="Password"
        />
      </div>
    ) : (
      <b className="text-sm">We will send you a link to reset your password</b>
    )}
    <LoginButton text={forgotPassword ? "Send Link" : "Sign In / Register"} />
  </>
);

const LoginButton = ({ text }: { text: string }) => {
  const { state } = useNavigation();
  const isubmitting = state === "submitting";
  return (
    <Button className="w-full flex justify-center">
      {isubmitting ? <i className="pi pi-spin pi-spinner"></i> : text}
    </Button>
  );
};

const ForgotPasswordCheckbox = ({
  forgotPassword,
  setForgotPassword,
}: {
  forgotPassword: boolean;
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
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
