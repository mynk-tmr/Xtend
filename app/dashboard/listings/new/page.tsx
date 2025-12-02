import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ListingForm from "@/components/listing/ListingForm";

export const metadata: Metadata = {
  title: "Create New Listing - Xtended Space",
  description: "List your storage space on Xtended Space",
};

export default async function CreateListingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ListingForm onSuccess={() => redirect("/dashboard")} />
      </div>
    </div>
  );
}
