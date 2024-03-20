import { RefObject } from "react";
import { Button } from "primereact/button";
import { useAppContext } from "@/providers/AppContextProvider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Form, useNavigation } from "react-router-dom";

type EditProfileFormType = {
  uploadFileInputRef: RefObject<HTMLInputElement>;
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>;
};

export const EditProfileForm = (props: EditProfileFormType) => {
  const { uploadFileInputRef, setAvatarUrl } = props;
  const { user } = useAppContext();
  const { state } = useNavigation();

  const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    if (files) {
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = () => setAvatarUrl(reader.result as string);
    } else {
      setAvatarUrl(user?.avatar || "");
    }
  };

  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="*:flex *:flex-col *:gap-2 [&_input]:py-2 space-y-4 [&_label]:text-xs grid sm:grid-cols-2 sm:items-center">
      <input
        type="file"
        name="avatar"
        className="!hidden"
        ref={uploadFileInputRef}
        onChange={changeAvatar}
      />

      <label htmlFor="fullname">Change Full Name</label>
      <InputText id="fullname" name="fullname" placeholder={user?.fullname} />

      <label htmlFor="email">Change Email</label>
      <InputText id="email" name="email" placeholder={user?.email} />

      <label htmlFor="password">Change Password</label>
      <Password id="password" name="password" toggleMask feedback={false} />

      <Button disabled={state === "submitting"} className="col-start-2">
        {state === "submitting" ? (
          <i className="pi pi-spin pi-spinner" />
        ) : (
          <span>
            <i className="pi pi-check"></i> Update Profile
          </span>
        )}
      </Button>
    </Form>
  );
};
