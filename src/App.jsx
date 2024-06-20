import "./App.css";
import "../node_modules/bulma/css/bulma.min.css";
import MenuPrincipal from "./components/menuPrincipal/menuPrincipal";
import "./sass/navbar.scss"
import { Root } from "./routes/routes";
import { CombinedProviders } from "./contexts/_ContextProviders";

function App() {
  return (
    <main className="container" style={{ maxWidth: "100vw" }}>
      <MenuPrincipal className="menu"/>
      <CombinedProviders>
          <Root />
      </CombinedProviders>
      
                  
              
    </main>
  );
}
export default App;
