import React from "react";
import "./App.css";
import "../node_modules/bulma/css/bulma.min.css";
import MenuPrincipal from "./components/menuPrincipal/menuPrincipal.jsx";
import "./sass/navbar.scss";
import { Root } from "./routes/routes.tsx";
import { CombinedProviders } from "./contexts/_ContextProviders.tsx";
import MenuConfiguration from "./components/menuConfiguration/menuConfiguration.jsx";
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
import { ToastContainer } from "react-toastify";

const AppContent: React.FC = () => {
  const { isAuthenticated, token } = useAuth();
  console.log('isAuthenticated:', isAuthenticated)

  return (
    <main className="container" style={{ maxWidth: "100vw" }}>
      {isAuthenticated && token && <MenuPrincipal id="menu" className='is-fixed-top' />}
    
      <Root />
      <MenuConfiguration />
    </main>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CombinedProviders>
        <ToastContainer />
        <AppContent />
      </CombinedProviders>
    </AuthProvider>
  );
}

export default App;
