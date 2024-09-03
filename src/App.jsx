import "./App.css";
import "../node_modules/bulma/css/bulma.min.css";
import MenuPrincipal from "./components/menuPrincipal/menuPrincipal";
import "./sass/navbar.scss";
import { Root } from "./routes/routes";
import { CombinedProviders } from "./contexts/_ContextProviders";
import MenuConfiguration from "./components/menuConfiguration/menuConfiguration";
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';

// Componente para controlar a renderização condicional
const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main className="container" style={{ maxWidth: "100vw" }}>
      {isAuthenticated && <MenuPrincipal id="menu" className='is-fixed-top' />}
      <Root />
      <MenuConfiguration />
    </main>
  );
};

function App() {
  return (
    <AuthProvider>
      <CombinedProviders>
        <AppContent />
      </CombinedProviders>
    </AuthProvider>
  );
}

export default App;