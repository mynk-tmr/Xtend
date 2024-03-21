import { useQuery } from "@tanstack/react-query";
import { apiclient } from "@/lib/apiclient";
import { AsyncUI } from "@/common/components/AsyncUI";
import { Booking } from "@/types/booking";

export const BookingsPage = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["mybookings"],
    retry: 3,
    queryFn: async () =>
      (await apiclient.get("bookings/all").json()) as Booking[],
  });

  if (isLoading) {
    return <AsyncUI.Loading />;
  }

  if (isError) {
    return <AsyncUI.Error refetch={refetch} />;
  }

  if (!data || !data.length) {
    return (
      <section className="grid place-items-center">
        <h1 className="text-xl">You do not have any Bookings ...</h1>
        <i className="pi pi-shopping-cart text-5xl" />
        <p className="text-ink font-semibold animate-pulse">
          You can going to search page or use menu to book a new
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-navy">My Bookings</h1>
      {data.map((booking: Booking, i) => (
        <p key={i}>{JSON.stringify(booking)}</p>
      ))}
    </section>
  );
};
