import React, { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import {toast } from "react-toastify";
import axios from "axios";
import { LoginInterface } from '../interfaces/LoginInterface';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate()
  const { login } = useAuth();
  const notify = (msg: string) => toast.error(msg);
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: LoginInterface = {
      email: email,
      password: password
    };
  
    try {
      const response = await axios.post('http://localhost:3000/login', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      login(response.data.token, response.data.user);

      navigate('/');
    } catch (error) {
      notify('CREDENCIAIS INCORRETAS');
      console.error("Erro ao fazer login:", error);
    }
  
    setEmailError('');
  };
  
  return (
  
        <form onSubmit={handleSubmit} style={{ maxWidth: '360px' }}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className={`input ${emailError ? 'is-danger' : ''}`}
                type="email"
                placeholder="joao@silva.com"
                value={email}
                onChange={handleEmailChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              {emailError && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              )}
            </div>
            {emailError && <p className="help is-danger">{emailError}</p>}
          </div>
          <div className="field">
            <label className="label">Senha</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="******"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <button type="submit" className="button is-primary">LOGIN</button>
        </form>
  );
}
