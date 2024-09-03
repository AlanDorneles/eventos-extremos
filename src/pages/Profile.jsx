import { useState, useEffect } from 'react';

export default function Profile() {
  const [keys, setKeys] = useState([]);
  const fetchKeys = async (id = 1) => {
    try {
      const response = await fetch(`http://localhost:3000/api/${id}`);
      if (!response.ok) {
        throw new Error("Não foi possível obter dados do inmet");
      }
      const data = await response.json();
      setKeys(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userId = 1; // ID DO USUÁRIO
    fetchKeys(userId);
  }, []);

  return (
    <div>
      <h6>MINHAS CHAVES</h6>
      <div className="table-container">
        <table className="table">
          <thead className="table-head-background-color">
            <tr>
              <th>CHAVE</th>
              <th>ORIGEM</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key.chave_id}>
                <td>{key.chave}</td>
                <td>{key.origem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
