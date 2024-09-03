import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Example validation
    if (!email.includes('@')) {
      setEmailError('This email is invalid');
      return;
    }

    setEmailError('');
    // Handle login logic here
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
