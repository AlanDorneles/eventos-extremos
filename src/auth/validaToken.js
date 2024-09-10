import jwtDecode from 'jwt-decode';

function validateToken() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = '/login';
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    console.log('Token decodificado:', decodedToken);
    const expiry = decodedToken.exp * 1000;
    if (Date.now() >= expiry) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      return false;
    }
    return true;

  } catch (error) {
    console.error('Erro ao validar o token:', error);
    localStorage.removeItem('authToken');
    window.location.href = '/login';
    return false;
  }
}

if (validateToken()) {
  // Redirecione para a página protegida ou continue com a lógica
  window.location.href = '/protected-route';
}
