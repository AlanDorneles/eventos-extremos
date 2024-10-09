import React from "react";
import "./App.css";
import "../node_modules/bulma/css/bulma.min.css";
import "./sass/navbar.scss";
import { Root } from "./routes/routes.tsx";
import { CombinedProviders } from "./contexts/_ContextProviders.tsx";
import MenuConfiguration from "./components/menuConfiguration/menuConfiguration.jsx";
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
import { ToastContainer } from "react-toastify";

const AppContent: React.FC = () => {

  return (
    <main className="container" style={{ maxWidth: "100vw" }}>
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
