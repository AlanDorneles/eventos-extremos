
import React, { useState } from "react";

export default function RequestAccess() {
  const [isValid, setIsValid] = useState({
    name: { validation: false, content: '' },
    lastName: { validation: false, content: '' },
    email: { validation: false, content: '' },
    password: { validation: false, content: '' },
    repeatPassword: { validation: false, content: '' },
    institute: { validation: false, content: '' },
    role: { validation: false, content: '' },
  });

  interface DataAccess {
    name: string;
    lastName: string;
    email: string;
    password: string;
    institute: string;
    role: string;
  }

  const validateName = (value: string): boolean => value.length > 3;
  const validateEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePassword = (password: string, repeatPassword: string): boolean => {
    return password.length > 6 && password === repeatPassword;
  };
  const validateInstitute = (value: string): boolean => value.length > 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, type, checked, multiple } = event.target as HTMLInputElement | HTMLSelectElement;

    const isValidField = () => {
      switch (name) {
        case 'name':
          return validateName(value);
        case 'email':
          return validateEmail(value);
        case 'password':
          return validatePassword(value, isValid.repeatPassword.content);
        case 'repeatPassword':
          return validatePassword(isValid.password.content, value);
        case 'institute':
          return validateInstitute(value);
        default:
          return true;
      }
    };

    if (type === 'checkbox' || type === 'radio') {
      setIsValid(prevState => ({
        ...prevState,
        [name]: {
          content: checked ? value : '',
          validation: isValidField()
        }
      }));
    } else if (multiple) {
      setIsValid(prevState => ({
        ...prevState,
        [name]: {
          content: Array.from(event.target.options)
            .filter(option => option.selected)
            .map(option => option.value)
            .join(', '),
          validation: isValidField()
        }
      }));
    } else {
      setIsValid(prevState => ({
        ...prevState,
        [name]: {
          content: value,
          validation: isValidField()
        }
      }));
    }
  };

  const sendData = async () => {
    const allFieldsValid = Object.values(isValid).every(field => field.validation);

    if (allFieldsValid) {
      const data: DataAccess = {
        name: isValid.name.content,
        lastName: isValid.lastName.content,
        email: isValid.email.content,
        password: isValid.password.content,
        institute: isValid.institute.content,
        role: isValid.role.content
      };

      try {
        const response = await fetch('http://localhost:3000/request-access', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Success:', result);
        // Aqui você pode fazer algo com o resultado, como mostrar uma mensagem de sucesso
      } catch (error) {
        console.error('Error:', error);
        // Aqui você pode mostrar uma mensagem de erro
      }
    } else {
      console.log('Por favor, preencha todos os campos corretamente.');
    }
  };

  return (
    <form style={{ maxWidth: "360px", overflow: "auto" }}>
      <div className="field">
        <label className="label">Nome</label>
        <div className="control">
          <input
            className={`input ${!isValid.name.validation ? 'is-danger' : 'is-primary'}`}
            type="text"
            placeholder="João"
            name="name"
            value={isValid.name.content}
            onChange={handleChange}
          />
          {!isValid.name.validation && <p className="help is-danger">Por favor, insira um nome válido.</p>}
        </div>
      </div>
      <div className="field">
        <label className="label">Sobrenome</label>
        <div className="control">
          <input
            className={`input ${!isValid.lastName.validation ? 'is-danger' : 'is-primary'}`}
            type="text"
            placeholder="Silva"
            name="lastName"
            value={isValid.lastName.content}
            onChange={handleChange}
          />
          {!isValid.lastName.validation && <p className="help is-danger">Por favor, insira um sobrenome válido.</p>}
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className={`input ${!isValid.email.validation ? 'is-danger' : 'is-primary'}`}
            type="email"
            placeholder="joao@email.com"
            name="email"
            value={isValid.email.content}
            onChange={handleChange}
          />
          {!isValid.email.validation && <p className="help is-danger">Por favor, insira um email válido.</p>}
        </div>
      </div>
      <div className="field">
        <label className="label">Senha</label>
        <div className="control">
          <input
            className={`input ${!isValid.password.validation ? 'is-danger' : 'is-primary'}`}
            type="password"
            placeholder="*****"
            name="password"
            value={isValid.password.content}
            onChange={handleChange}
          />
          {!isValid.password.validation && <p className="help is-danger">A senha deve ter mais de 6 caracteres e corresponder à senha repetida.</p>}
        </div>
      </div>
      <div className="field">
        <label className="label">Repita a senha</label>
        <div className="control">
          <input
            className={`input ${!isValid.repeatPassword.validation ? 'is-danger' : 'is-primary'}`}
            type="password"
            placeholder="*****"
            name="repeatPassword"
            value={isValid.repeatPassword.content}
            onChange={handleChange}
          />
          {!isValid.repeatPassword.validation && <p className="help is-danger">As senhas não coincidem ou são inválidas.</p>}
        </div>
      </div>
      <div className="field">
        <label className="label">Instituto</label>
        <div className="control">
          <select
            multiple
            size={3}
            name="institute"
            onChange={handleChange}
            className={`input ${!isValid.institute.validation ? 'is-danger' : 'is-primary'}`}
          >
            <option value="IO">IO - Instituto de Oceanologia</option>
            <option value="C3">C3 - Centro de Ciências Computacionais</option>
            <option value="ICEAC">ICEAC - Instituto de Ciências Econômicas, Administrativas e Sociais</option>
            <option value="ICHI">ICHI - Instituto de Ciências Humanas e da Informação</option>
            <option value="EE">Escola de Engenharia</option>
            <option value="IMEF">Instituto de Matemática, Estatística e Física</option>
            <option value="ILA">Instituto de Letras e Artes</option>
            <option value="Other">Outro</option>
          </select>
          {!isValid.institute.validation && <p className="help is-danger">Por favor, selecione um instituto.</p>}
        </div>
      </div>

      <div className="control">
        <label className="radio">
          <input
            type="radio"
            name="role"
            value="Professor"
            checked={isValid.role.content === 'Professor'}
            onChange={(e) => handleChange({ target: { name: 'role', value: e.target.value } } as any)}
          />
          Professor
        </label>
        <label className="radio">
          <input
            type="radio"
            name="role"
            value="Estudante"
            checked={isValid.role.content === 'Estudante'}
            onChange={(e) => handleChange({ target: { name: 'role', value: e.target.value } } as any)}
          />
          Estudante
        </label>
      </div>

      <button type="button" className="button is-primary" onClick={sendData}>
        PEDIR ACESSO
      </button>
    </form>
  );
}
