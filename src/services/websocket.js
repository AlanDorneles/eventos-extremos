export function setupWebSocket() {
  const configuredUrl = import.meta.env.VITE_WS_URL;
  const apiUrl = import.meta.env.VITE_API_URL;
  const proto = window.location.protocol === "https:" ? "wss" : "ws";

  let wsUrl = configuredUrl;

  if (wsUrl && wsUrl.startsWith("/")) {
    wsUrl = `${proto}://${window.location.host}${wsUrl}`;
  }

  if (!wsUrl && apiUrl) {
    // Ex.: http://localhost:3000/api -> ws://localhost:3000/ws
    wsUrl = apiUrl.replace(/^http/i, "ws").replace(/\/api\/?$/, "/ws");
  }

  if (!wsUrl) {
    // Fallback para ambiente onde API/WS compartilham host
    wsUrl = `${proto}://${window.location.host}/ws`;
  }

  let socket = null;
  let retryTimer = null;
  let closedByApp = false;

  const connect = () => {
    socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("Connected to WS");
    };

    socket.onmessage = (_evt) => {
      // reservado para mensagens futuras
    };

    socket.onerror = () => {
      // evita ruído no console em quedas temporárias do backend
    };

    socket.onclose = () => {
      if (closedByApp) return;
      retryTimer = window.setTimeout(connect, 1500);
    };
  };

  connect();

  return () => {
    closedByApp = true;
    if (retryTimer) window.clearTimeout(retryTimer);
    if (socket && socket.readyState <= 1) socket.close();
  };
}
