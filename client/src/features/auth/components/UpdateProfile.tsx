import { Card } from "primereact/card";
import { api } from "../services/api";
import { Avatar } from "primereact/avatar";
import { RefObject, useRef } from "react";
import { EmailField, Fullname } from "./FormElements";
import { useForm } from "react-hook-form";
import { LoginValues } from "../types/creds";
import { useState } from "react";
import { Button } from "primereact/button";

export const UpdateProfile = () => {
  const uploadFileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  const [editEnabled, setEditEnabled] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  return (
    <Card
      className="sm:px-12"
      title={
        <Header
          {...{ editEnabled, uploadFileInputRef, setEditEnabled, avatarUrl }}
        />
      }>
      {editEnabled ? (
        <EditInfoForm
          {...{
            uploadFileInputRef,
            register,
            errors,
            handleSubmit,
            userId: "",
            setAvatarUrl,
          }}
        />
      ) : (
        <section>{/* user info */}</section>
      )}
    </Card>
  );
};

type HeaderType = {
  editEnabled: boolean;
  uploadFileInputRef: RefObject<HTMLInputElement>;
  setEditEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  avatarUrl: string;
};

const Header = ({
  editEnabled,
  uploadFileInputRef,
  setEditEnabled,
  avatarUrl,
}: HeaderType) => {
  return (
    <header className="flex justify-between">
      <figure>
        <Avatar
          image={avatarUrl}
          label="M"
          shape="circle"
          className="size-20 mr-6"
          onClick={() => uploadFileInputRef.current?.click()}
        />
        {editEnabled && (
          <figcaption className="text-xs mt-2 font-normal">
            Click to change avatar
          </figcaption>
        )}
      </figure>{" "}
      <button
        onClick={() => setEditEnabled(!editEnabled)}
        className="text-ink animate-pulse">
        {editEnabled ? "Cancel Edit" : "Edit Profile"}{" "}
        <i className="pi pi-pencil ml-2"></i>
      </button>
    </header>
  );
};

type EditFormType = {
  uploadFileInputRef: RefObject<HTMLInputElement>;
  register: ReturnType<typeof useForm<LoginValues>>["register"];
  errors: ReturnType<typeof useForm<LoginValues>>["formState"]["errors"];
  handleSubmit: ReturnType<typeof useForm<LoginValues>>["handleSubmit"];
  userId: string;
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>;
};

const EditInfoForm = ({
  uploadFileInputRef,
  register,
  errors,
  handleSubmit,
  userId,
  setAvatarUrl,
}: EditFormType) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(() => {
        if (formRef.current) {
          api.update(new FormData(formRef.current), userId);
        }
      })}
      encType="multipart/form-data"
      className="*:flex *:flex-col *:gap-2 [&_input]:py-2 space-y-4 [&_label]:text-xs">
      <input
        type="file"
        name="avatar"
        className="!hidden"
        ref={uploadFileInputRef}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files?.[0];
          if (files) {
            const reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = () => setAvatarUrl(reader.result as string);
          } else {
            setAvatarUrl("");
          }
        }}
      />
      <Fullname {...{ errors, register, required: false }} />
      <EmailField {...{ errors, register, required: false }} />
      <Button label="Update" icon="pi pi-check" className="w-full !block" />
    </form>
  );
};
