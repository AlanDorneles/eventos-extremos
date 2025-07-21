import "./App.css";
import "../node_modules/bulma/css/bulma.min.css";
import "./sass/navbar.scss";
import { Root } from "./routes/routes";
import { CombinedProviders } from "./contexts/_ContextProviders";


export default function App() {
  return(
  <CombinedProviders>
    <Root />
  </CombinedProviders>)
}

