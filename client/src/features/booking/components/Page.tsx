import { useQuery } from "@tanstack/react-query";
import { apiclient } from "@/lib/apiclient";
import { AsyncUI } from "@/common/components/AsyncUI";
import { Booking } from "@/types/booking";

const BookingsPage = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["mybookings"],
    queryFn: async () => {
      try {
        return (await apiclient.get("bookings/all").json()) as Booking[];
      } catch (e) {
        return null;
      }
    },
  });

  if (isPending) {
    return <AsyncUI.Loading />;
  }

  if (!data) {
    return <AsyncUI.Error refetch={refetch} />;
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

export default BookingsPage;
