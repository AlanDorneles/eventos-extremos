export function setupWebSocket() {
  const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const host = window.location.host;
  const socket = new WebSocket(`${proto}://${host}/ws`);
  socket.onopen    = () => console.log('Connected to WS');
  socket.onmessage = evt => { /* … */ };
  socket.onclose   = () => console.log('Disconnected from WS');
  return () => socket.close();
}
