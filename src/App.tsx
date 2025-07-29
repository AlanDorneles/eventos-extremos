import "./App.css";
import "../node_modules/bulma/css/bulma.min.css";
import "./sass/navbar.scss";
import "./sass/button.scss";
import "./sass/select.scss";
import { Root } from "./routes/routes";
import { CombinedProviders } from "./contexts/_ContextProviders";
import { setupWebSocket } from './services/websocket.js'
import { useEffect } from 'react';

export default function App() {
    useEffect(() => {
       // Inicia a conexão WebSocket assim que o App monta
       const cleanup = setupWebSocket();
       // Limpa a conexão ao desmontar
       return () => {
          cleanup();
          };
    }, []);
  return(
  <CombinedProviders>
    <Root />
  </CombinedProviders>)
}
