import Router from "@/routes";
import { PrimeReactProvider } from "primereact/api";
import "./index.css"; //keep it above primeReact css files
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primeicons/primeicons.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "./providers/AppContextProvider";
import { ToastProvider } from "./providers/ToastProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <PrimeReactProvider>
          <ToastProvider>
            <Router />
          </ToastProvider>
        </PrimeReactProvider>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
