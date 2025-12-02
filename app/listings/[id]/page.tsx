import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListingDetails from "@/components/listing/ListingDetails";

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ListingPageProps): Promise<Metadata> {
  const { id } = await params;

  // In a real implementation, you would fetch the listing data here
  // to generate dynamic metadata
  return {
    title: `Storage Space Details - Xtended Space`,
    description: "View detailed information about this storage space",
    openGraph: {
      title: `Storage Space Details - Xtended Space`,
      description: "View detailed information about this storage space",
    },
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return <ListingDetails listingId={id} />;
}
