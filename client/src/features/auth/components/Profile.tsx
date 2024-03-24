import { LogOut } from "./LogOut";
import { useState, useRef, useEffect } from "react";
import { Avatar } from "primereact/avatar";
import { EditProfileForm } from "./EditProfileForm";
import { isoToLocale } from "@/lib/intl";
import { useAppContext } from "@/providers/AppContextProvider";
import { Button } from "primereact/button";
import { RouteActionData } from "@/types/actions";
import { useActionData } from "react-router-dom";
import { useToast } from "@/providers/ToastProvider";
import { User } from "@/types/user";

export const Profile = () => {
  const [editEnabled, setEditEnabled] = useState(false);
  const { verifyUser } = useAppContext();
  const res = useActionData() as RouteActionData;
  const toast = useToast();

  useEffect(() => {
    if (res?.ok) {
      verifyUser();
      toast.success("Profile updated");
      setEditEnabled(false);
    } else if (res?.error) toast.error(res.error);
  }, [res, toast, verifyUser, setEditEnabled]);

  return (
    <section
      style={{ fontFamily: "Lato, sans-serif" }}
      className="grow p-8 justify-self-center">
      <header className="mx-auto w-fit">
        <Button
          label={editEnabled ? "Cancel Edit" : "Edit Profile"}
          className={`${editEnabled ? "bg-blood" : "bg-black"}`}
          icon={editEnabled ? "pi pi-times" : "pi pi-pencil"}
          rounded
          onClick={() => setEditEnabled(!editEnabled)}
        />
      </header>
      <UserAvatarAndInfo {...{ editEnabled, setEditEnabled }} />
    </section>
  );
};
Profile.action = EditProfileForm.action;

const UserAvatarAndInfo = ({ editEnabled }: { editEnabled: boolean }) => {
  const { user } = useAppContext();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");
  const uploadFileInputRef = useRef<HTMLInputElement>(null);
  return (
    <section className="flex flex-wrap gap-x-10 place-items-center">
      <Avatar
        image={avatarUrl}
        label={user?.fullname[0]}
        shape="circle"
        className={`size-48 m-8 p-overlay-badge mx-auto ${
          editEnabled ? "ring-4 ring-ink" : ""
        }`}
        onClick={() => uploadFileInputRef.current?.click()}></Avatar>
      {editEnabled ? (
        <EditProfileForm {...{ uploadFileInputRef, setAvatarUrl }} />
      ) : (
        <UserInfoSection />
      )}
    </section>
  );
};

const UserInfoSection = () => {
  const { user } = useAppContext() as { user: User };
  return (
    <article className="grid grid-cols-2">
      <span>Full Name</span>
      <b>{user.fullname}</b>
      <span>Email</span>
      <b>{user.email}</b>
      <span>Joined</span>
      <b className="mb-6">{isoToLocale(user.joined)}</b>
      <LogOut />
    </article>
  );
};
