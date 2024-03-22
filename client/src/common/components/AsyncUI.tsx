import { Button } from "primereact/button";
import { Suspense } from "react";
import { Await } from "react-router-dom";

const Error = ({ refetch }: { refetch?: () => void }) => {
  return (
    <div className="text-blood flex flex-col items-center justify-center gap-8 mt-8">
      <h1 className="text-xl font-bold">
        An error occurred while loading this page
      </h1>
      <i className="pi pi-exclamation-triangle text-3xl"></i>
      <Button
        label="Try again"
        icon="pi pi-refresh"
        onClick={() => refetch && refetch()}
      />
    </div>
  );
};

const Loading = () => {
  return (
    <div className="*:text-3xl flex flex-col items-center justify-center gap-8">
      <i className="pi pi-spin pi-spinner"></i>
      <p>Loading...</p>
    </div>
  );
};

export const AsyncUI = <T,>({
  promise,
  children,
  refetch,
}: {
  promise: Promise<T>;
  children: React.FC<T>;
  refetch?: () => void;
}) => (
  <Suspense fallback={<Loading />}>
    <Await resolve={promise} errorElement={<Error refetch={refetch} />}>
      {(promise) => children(promise)}
    </Await>
  </Suspense>
);
