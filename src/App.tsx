import "./App.css";
import "../node_modules/bulma/css/bulma.min.css";
import "./sass/navbar.scss";
import { Root } from "./routes/routes";
import { CombinedProviders } from "./contexts/_ContextProviders";
//import { CombinedProviders } from "./contexts/_ContextProviders";
//import MenuConfiguration from "./components/menuConfiguration/menuConfiguration.jsx";
//import { AuthProvider,} from "./contexts/AuthContext";
//import { ToastContainer } from "react-toastify";

export default function App() {
  return(
  <CombinedProviders>
    <Root />
  </CombinedProviders>)
}

