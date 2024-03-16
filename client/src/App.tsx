import Router from "@/routes";
import { PrimeReactProvider } from "primereact/api";
import "./index.css"; //keep it above primeReact css files
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <PrimeReactProvider>
      <Router />
    </PrimeReactProvider>
  );
}

export default App;
