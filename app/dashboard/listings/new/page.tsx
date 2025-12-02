import type { Metadata } from "next";
import ListingFormClient from "./ListingFormClient";

export const metadata: Metadata = {
  title: "Create New Listing - Xtended Space",
  description: "List your storage space on Xtended Space",
};

export default function CreateListingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ListingFormClient />
      </div>
    </div>
  );
}
