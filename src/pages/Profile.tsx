import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Key } from "../interfaces/Keys";
import axios from "axios";

export default function Profile() {
  const [keys, setKeys] = useState<Key[]>([]);
  const { user } = useAuth();
  const [modalActive, setModalActive] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [origin, setOrigin] = useState('INMET');

  type NewKey = Pick<Key, 'chave' | 'origem'>;

  const fetchKeys = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/keys/${id}`);
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
    if (user && user.id) {
      fetchKeys(user.id);
    }
  }, [user]);

  const handleChangeModal = () => {
    setModalActive(!modalActive);
  };

  const sendKey = async (event: React.FormEvent) => {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário

    const newKey: NewKey = { chave: apiKey, origem: origin };
    

    try {
      const response = await axios.post(
        `http://localhost:3000/keys/${user?.id}`,
        newKey,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Chave enviada com sucesso', response.data);
      fetchKeys(user?.id ?? 0); // Recarrega as chaves após enviar uma nova
      setModalActive(false); // Fecha o modal após enviar
    } catch (error) {
      console.log(origin, user?.id)
      console.error('Erro ao enviar a chave', error);
    }
  };

  return (
    <div className="box" style={{width:'100vw'}}>
      <div className="is-flex is-justify-content-space-between">
        <h6 className="is-size-4">MINHAS CHAVES</h6>
        <button
          className="button is-primary js-modal-trigger"
          onClick={handleChangeModal}
        >
          INSERIR CHAVE
        </button>
      </div>
      <div className={`modal ${modalActive ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <form onSubmit={sendKey} style={{ backgroundColor: 'white', borderRadius: '8px' }} className="p-6">
            <div className="field">
              <label className="label">Chave</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="ABC123abC123"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Origem</label>
              <div className="control">
                <div className="select">
                  <select
                    value={origin}
                    onChange={(e) => setOrigin((e.target as HTMLSelectElement).value)}
                  >
                    <option value={'INMET'}>INMET</option>
                    <option value={'REDEMET'}>REDEMET</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="button is-primary mt-4" type="submit">
              REGISTRAR CHAVE
            </button>
          </form>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={handleChangeModal}
        ></button>
      </div>
      <div className="box is-flex mt-5">
      <div className="table-container " style={{width:'100%'}}>
        <table className="table" style={{width:'100%'}}>
          <thead className="table-head-background-color">
            <tr >
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
    </div>
  );
}
