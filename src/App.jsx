import "./App.css";
import "../node_modules/bulma/css/bulma.min.css";
import MenuPrincipal from "./components/menuPrincipal/menuPrincipal";
import "./sass/navbar.scss"
import { Root } from "./routes/routes";
import { CombinedProviders } from "./contexts/_ContextProviders";
import MenuConfiguration from "./components/menuConfiguration/menuConfiguration";

function App() {
  return (
   
    <main className="container" style={{ maxWidth: "100vw" }}>
      <CombinedProviders>
          <MenuPrincipal  id="menu" className='is-fixed-top'/>
          <Root />
          <MenuConfiguration/>         
      </CombinedProviders>
    </main>

  );
}
export default App;
