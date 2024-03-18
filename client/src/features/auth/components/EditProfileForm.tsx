import { api } from "../services/api";
import { RefObject, useRef } from "react";
import { EmailField, Fullname } from "./FormElements";
import { useForm } from "react-hook-form";
import { LoginValues } from "../types/creds";
import { Button } from "primereact/button";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/providers/ToastProvider";
import { useAppContext } from "@/providers/AppContextProvider";

type EditProfileFormType = {
  uploadFileInputRef: RefObject<HTMLInputElement>;
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>;
  setEditEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditProfileForm = (props: EditProfileFormType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  const formRef = useRef<HTMLFormElement>(null);
  const toast = useToast();
  const { verifyUser, user } = useAppContext();

  const { mutate: onSubmit, status } = useMutation({
    mutationFn: async () => {
      if (formRef.current) {
        await api.update(new FormData(formRef.current));
        verifyUser();
        toast.success("Profile updated");
        props.setEditEnabled(false);
      }
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    if (files) {
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = () => props.setAvatarUrl(reader.result as string);
    } else {
      props.setAvatarUrl(user?.avatar || "");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(() => onSubmit())}
      encType="multipart/form-data"
      className="*:flex *:flex-col *:gap-2 [&_input]:py-2 space-y-4 [&_label]:text-xs">
      <input
        type="file"
        name="avatar"
        className="!hidden"
        ref={props.uploadFileInputRef}
        onChange={changeAvatar}
      />
      <Fullname
        {...{ errors, register, required: false, defaultValue: user?.fullname }}
      />
      <EmailField
        {...{ errors, register, required: false, defaultValue: user?.email }}
      />
      <Button disabled={status === "pending"} className="w-full !block">
        {status === "pending" ? (
          <i className="pi pi-spin pi-spinner" />
        ) : (
          <span>
            <i className="pi pi-check"></i> Update Profile
          </span>
        )}
      </Button>
    </form>
  );
};
