import { Button } from "primereact/button";

/* eslint-disable react-refresh/only-export-components */
const Error = ({ refetch }: { refetch?: () => void }) => {
  return (
    <div className="w-fit mx-auto mt-10 text-blood grid gap-2 place-items-center">
      <h1>An error occurred while loading this page</h1>
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
    <div className="mt-12 *:text-3xl w-fit mx-auto">
      <i className="pi pi-spin pi-spinner"></i>
      <p>Loading...</p>
    </div>
  );
};

export const AsyncUI = {
  Error,
  Loading,
};
