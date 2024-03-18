import { LogOut } from "./LogOut";
import { RefObject, useState, useRef } from "react";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { EditProfileForm } from "./EditProfileForm";
import { UserType } from "@/common/types/userType";
import { isoToLocale } from "@/lib/intl";

type HeaderType = {
  editEnabled: boolean;
  uploadFileInputRef: RefObject<HTMLInputElement>;
  setEditEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  avatarUrl: string;
};

const Header = (props: HeaderType) => {
  return (
    <header className="flex justify-between">
      <figure>
        <Avatar
          image={props.avatarUrl}
          label="M"
          shape="circle"
          className="size-20 mr-6"
          onClick={() => props.uploadFileInputRef.current?.click()}
        />
        {props.editEnabled && (
          <figcaption className="text-xs mt-2 font-normal">
            Click to change avatar
          </figcaption>
        )}
      </figure>{" "}
      <button
        onClick={() => props.setEditEnabled(!props.editEnabled)}
        className="text-ink animate-pulse">
        {props.editEnabled ? "Cancel Edit" : "Edit Profile"}{" "}
        <i className="pi pi-pencil ml-2"></i>
      </button>
    </header>
  );
};

export const Profile = ({ user }: { user: UserType }) => {
  const [editEnabled, setEditEnabled] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || "");
  const uploadFileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card
      className="sm:px-12"
      title={
        <Header
          {...{ editEnabled, uploadFileInputRef, setEditEnabled, avatarUrl }}
        />
      }>
      {editEnabled ? (
        <EditProfileForm
          {...{ uploadFileInputRef, setAvatarUrl, setEditEnabled }}
        />
      ) : (
        <section className="grid grid-cols-2 gap-3">
          <b>Full Name :</b>{" "}
          <b className="text-blood">{user?.fullname || "Not Available"}</b>
          <b>Email :</b> <b className="text-grass">{user?.email}</b>
          <b>Member since :</b>{" "}
          <b className="text-love">{isoToLocale(user?.joined)}</b>
          <div className="col-span-2 mt-4">
            <LogOut />
          </div>
        </section>
      )}
    </Card>
  );
};
