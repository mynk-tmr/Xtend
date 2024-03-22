import { RefObject } from "react";
import { Button } from "primereact/button";
import { useAppContext } from "@/providers/AppContextProvider";
import { InputText } from "primereact/inputtext";
import { ActionFunction, Form, useNavigation } from "react-router-dom";
import { User } from "@/types/user";
import { api } from "../services/api";

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
      className="[&_input]:py-2 space-y-4 grid sm:grid-cols-2 sm:items-center">
      <input
        type="file"
        name="avatar"
        className="!hidden"
        ref={uploadFileInputRef}
        onChange={changeAvatar}
      />

      <label htmlFor="fullname">Change Full Name</label>
      <InputText id="fullname" name="fullname" defaultValue={user?.fullname} />

      <label htmlFor="email">Change Email</label>
      <InputText id="email" name="email" defaultValue={user?.email} />

      <Button
        disabled={state === "submitting"}
        className="col-start-2 flex justify-center">
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

const action: ActionFunction = async ({ request }) => {
  const f = await request.formData();
  const data = Object.fromEntries(f) as User & { password: string };
  if (data.email && !data.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g))
    return { error: "Invalid email" };
  if (data.password && data.password.length < 8)
    return { error: "Password must be atleast 8 characters long" };
  if (data.fullname && !data.fullname.match(/^[a-zA-Z\s]*$/i))
    return { error: "Invalid name" };
  try {
    await api.update(f);
  } catch (e) {
    return { error: "Couldn't update profile." };
  }
  return { ok: true };
};

EditProfileForm.action = action;
