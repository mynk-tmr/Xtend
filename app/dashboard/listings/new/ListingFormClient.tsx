"use client";

import { redirect } from "next/navigation";
import ListingForm from "@/components/listing/ListingForm";

export default function ListingFormClient() {
  return <ListingForm onSuccess={() => redirect("/dashboard")} />;
}
