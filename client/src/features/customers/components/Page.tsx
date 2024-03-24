import { AsyncUI } from "@/common/components/AsyncUI";
import { bookapi } from "@/features/booking";
import { useSubmissionEffect } from "@/hooks/useSubmissionEffect";
import { isoToLocale } from "@/lib/intl";
import { Booking } from "@/types/booking";
import { User } from "@/types/user";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  defer,
  useLoaderData,
} from "react-router-dom";

type Customer = {
  booking: Booking;
  user: User;
};

export const CustomersPage = () => {
  const { customers } = useLoaderData() as {
    customers: Promise<Customer[]>;
  };
  useSubmissionEffect(() => {}, "Your answer has been submitted");
  return (
    <section>
      <h1 className="*:text-3xl text-center">
        <b>Your Customers </b>
        <i className="ml-3 pi pi-users"></i>
      </h1>
      <section className="flex gap-4 flex-wrap mt-12">
        <AsyncUI promise={customers}>
          {(customers) => {
            if (!customers || !customers.length) {
              return (
                <h2 className="text-xl text-center grow">
                  You do not have any pending customers ...
                  <br />
                  But there will be soon{" "}
                  <i className="pi pi-spin pi-wallet"></i>
                </h2>
              );
            }
            return customers.map((customer, i) => (
              <RequestBox key={i} customer={customer} />
            ));
          }}
        </AsyncUI>
      </section>
    </section>
  );
};

const RequestBox = ({ customer }: { customer: Customer }) => {
  return (
    <Fieldset
      legend={
        <div>
          <Avatar
            className="size-20"
            image={customer.user.avatar}
            label={customer.user.fullname[0]}
            shape="circle"
          />
        </div>
      }
      pt={{
        content: { className: "*:mb-2" },
      }}>
      <span>
        <b className="text-lg">{customer.user.fullname}</b> wants to rent your
        storage
      </span>
      <p className="text-sm">StorageId: {customer.booking.listingId}</p>
      <p>
        Duration :{" "}
        <time className="bg-neutral p-1">
          {isoToLocale(customer.booking.start)}
        </time>{" "}
        to{" "}
        <time className="bg-blue-200 p-1">
          {isoToLocale(customer.booking.end)}
        </time>
      </p>
      <p>
        Amount :{" "}
        <b className="bg-success">₹ {customer.booking.price} per day</b>
      </p>
      <Form method="post" className="flex gap-2 mt-4">
        <input hidden name="bookingId" value={customer.booking._id} readOnly />
        <Button icon="pi pi-check" name="status" value="accepted">
          Accept
        </Button>
        <Button
          icon="pi pi-times"
          className="bg-blood"
          name="status"
          value="rejected">
          Reject
        </Button>
      </Form>
    </Fieldset>
  );
};

const loader: LoaderFunction = async () => {
  const customersPromise = bookapi.getcustomers();
  return defer({ customers: customersPromise });
};

const action: ActionFunction = async ({ request }) => {
  try {
    const data = Object.fromEntries(await request.formData());
    await bookapi.confirm(data.bookingId as string, data.status as string);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: "Failed to submit your answer" };
  }
};

CustomersPage.loader = loader;
CustomersPage.action = action;
