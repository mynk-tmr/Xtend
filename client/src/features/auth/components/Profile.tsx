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

export const Profile = () => {
  const [editEnabled, setEditEnabled] = useState(false);
  const { verifyUser, user } = useAppContext();
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
      className="grow p-8 grid place-items-center">
      <h1 className="text-3xl font-bold text-center text-navy">
        {user?.fullname + "'s Profile"}
      </h1>
      <Button
        label={editEnabled ? "Cancel Edit" : "Edit Profile"}
        className={`mt-4 w-fit ${editEnabled ? "bg-blood" : "bg-black"}`}
        icon={editEnabled ? "pi pi-times" : "pi pi-pencil"}
        rounded
        onClick={() => setEditEnabled(!editEnabled)}
      />
      <UserAvatarAndInfo {...{ editEnabled }} />
    </section>
  );
};

const UserAvatarAndInfo = ({ editEnabled }: { editEnabled: boolean }) => {
  const { user } = useAppContext();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");
  const uploadFileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="relative">
        <Avatar
          image={avatarUrl}
          label={user?.fullname[0]}
          shape="circle"
          className={`size-48 m-8 p-overlay-badge ${
            editEnabled ? "ring-4 ring-ink" : ""
          }`}
          onClick={() => uploadFileInputRef.current?.click()}></Avatar>
      </div>
      {editEnabled ? (
        <EditProfileForm {...{ uploadFileInputRef, setAvatarUrl }} />
      ) : (
        <UserInfoSection />
      )}
    </>
  );
};

const UserInfoSection = () => {
  const { user } = useAppContext();
  return (
    <section className="grid grid-cols-2 gap-3 p-3 bg-neutral">
      <b>Full Name :</b>{" "}
      <b className="text-blood">{user?.fullname || "Not Available"}</b>
      <b>Email :</b> <b className="text-grass">{user?.email}</b>
      <b>Member since :</b>{" "}
      <b className="text-navy">{isoToLocale(user?.joined || "")}</b>
      <div className="col-span-2 mt-4">
        <LogOut />
      </div>
    </section>
  );
};
