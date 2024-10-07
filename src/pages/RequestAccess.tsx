import React, { useState } from "react";
import axios from "axios";
import { DataAccess } from "../interfaces/DataAccess";
import {
  validateName,
  validateEmail,
  validateInstitute,
  validatePassword,
} from "../utils/validatorsRequestAccess";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { FaCheck } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

export default function RequestAccess() {
  const [isValid, setIsValid] = useState({
    name: { validation: false, content: "" },
    lastName: { validation: false, content: "" },
    email: { validation: false, content: "" },
    password: { validation: false, content: "" },
    repeatPassword: { validation: false, content: "" },
    institute: { validation: false, content: "" },
    role: { validation: false, content: "" },
  });

  const [sended, setSended] = useState(false);
  const notify = (msg: string) => toast.error(msg);

  const handleSended = () => {
    setSended(false)
  }

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, type, checked, multiple } = event.target as
      | HTMLInputElement
      | HTMLSelectElement;

    const isValidField = () => {
      switch (name) {
        case "name":
          return validateName(value);
        case "lastName":
          return validateName(value);
        case "email":
          return validateEmail(value);
        case "password":
          return validatePassword(value, isValid.repeatPassword.content);
        case "repeatPassword":
          return validatePassword(isValid.password.content, value);
        case "institute":
          return validateInstitute(value);
        default:
          return true;
      }
    };

    if (type === "checkbox" || type === "radio") {
      setIsValid((prevState) => ({
        ...prevState,
        [name]: {
          content: checked ? value : "",
          validation: isValidField(),
        },
      }));
    } else if (multiple) {
      setIsValid((prevState) => ({
        ...prevState,
        [name]: {
          content: Array.from(event.target.options)
            .filter((option) => option.selected)
            .map((option) => option.value)
            .join(", "),
          validation: isValidField(),
        },
      }));
    } else {
      setIsValid((prevState) => ({
        ...prevState,
        [name]: {
          content: value,
          validation: isValidField(),
        },
      }));
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    console.log(e);
    const allFieldsValid = Object.values(isValid).every(
      (field) => field.validation
    );

    if (allFieldsValid) {
      const data: DataAccess = {
        name: isValid.name.content,
        lastName: isValid.lastName.content,
        email: isValid.email.content,
        password: isValid.password.content,
        institute: isValid.institute.content,
        role: isValid.role.content,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/access",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Success:", response.data);
        setSended(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios Error:", error.response?.data || error.message);
          notify(error.response?.data.error);
        } else {
          console.error("Error:", error);
        }
      }
    } else {
      console.log("Por favor, preencha todos os campos corretamente.");
    }
  };
  return (
    <>
    {sended ? 
      <div className='is-flex-direction-column is-justify-content-center is-align-items-center mt-6'>
        <p className="has-text-centered"><FaCircleCheck className="is-size-3 has-text-primary"/></p>
        <p className="is-size-5 has-text-centered has-text-weight-bold">Pedido criado</p>
        <p className="is-size-7 has-text-centered">Um email será enviado com o status da sua solicitação</p>
        <p className="has-text-centered"><button className="button is-primary is-text is-light mt-4" onClick={handleSended}>Pedir outro acesso</button></p>
      </div>:
    (<form style={{ maxWidth: "360px", overflow: "auto" }} onSubmit={sendData}>
      <div className="field">
        <label className="label">Nome</label>
        <div className="control">
          <input
            className={`input ${
              !isValid.name.validation ? "is-danger" : "is-primary"
            }`}
            type="text"
            placeholder="João"
            name="name"
            value={isValid.name.content}
            onChange={handleChange}
          />
          {!isValid.name.validation && (
            <p className="help is-danger">
              Nome deve ter mais que 3 caracteres.
            </p>
          )}
        </div>
      </div>
      <div className="field">
        <label className="label">Sobrenome</label>
        <div className="control">
          <input
            className={`input ${
              !isValid.lastName.validation ? "is-danger" : "is-primary"
            }`}
            type="text"
            placeholder="Silva"
            name="lastName"
            value={isValid.lastName.content}
            onChange={handleChange}
          />
          {!isValid.lastName.validation && (
            <p className="help is-danger">
              Sobrenome deve ter mais que 3 caracteres
            </p>
          )}
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className={`input ${
              !isValid.email.validation ? "is-danger" : "is-primary"
            }`}
            type="email"
            placeholder="joao@email.com"
            name="email"
            value={isValid.email.content}
            onChange={handleChange}
          />
          {!isValid.email.validation && (
            <p className="help is-danger">Por favor, insira um email válido.</p>
          )}
        </div>
      </div>
      <div className="field">
        <label className="label">Senha</label>
        <div className="control">
          <input
            className={`input ${
              !isValid.password.validation ? "is-danger" : "is-primary"
            }`}
            type="password"
            placeholder="*****"
            name="password"
            value={isValid.password.content}
            onChange={handleChange}
          />
          {!isValid.password.validation && (
            <p className="help is-danger">
              A senha deve ter mais de 6 caracteres e corresponder à senha
              repetida.
            </p>
          )}
        </div>
      </div>
      <div className="field">
        <label className="label">Repita a senha</label>
        <div className="control">
          <input
            className={`input ${
              !isValid.repeatPassword.validation ? "is-danger" : "is-primary"
            }`}
            type="password"
            placeholder="*****"
            name="repeatPassword"
            value={isValid.repeatPassword.content}
            onChange={handleChange}
          />
          {!isValid.repeatPassword.validation && (
            <p className="help is-danger">
              As senhas não coincidem ou são inválidas.
            </p>
          )}
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
            className={`input ${
              !isValid.institute.validation ? "is-danger" : "is-primary"
            }`}
          >
            <option value="IO">IO - Instituto de Oceanologia</option>
            <option value="C3">C3 - Centro de Ciências Computacionais</option>
            <option value="ICEAC">
              ICEAC - Instituto de Ciências Econômicas, Administrativas e
              Sociais
            </option>
            <option value="ICHI">
              ICHI - Instituto de Ciências Humanas e da Informação
            </option>
            <option value="EE">Escola de Engenharia</option>
            <option value="IMEF">
              Instituto de Matemática, Estatística e Física
            </option>
            <option value="ILA">Instituto de Letras e Artes</option>
            <option value="Other">Outro</option>
          </select>
          {!isValid.institute.validation && (
            <p className="help is-danger">Por favor, selecione um instituto.</p>
          )}
        </div>
      </div>

      <div className="control">
        <label className="radio">
          <input
            type="radio"
            name="role"
            value="Professor"
            checked={isValid.role.content === "Professor"}
            onChange={(e) =>
              handleChange({
                target: { name: "role", value: e.target.value },
              } as any)
            }
          />
          Professor
        </label>
        <label className="radio">
          <input
            type="radio"
            name="role"
            value="Estudante"
            checked={isValid.role.content === "Estudante"}
            onChange={(e) =>
              handleChange({
                target: { name: "role", value: e.target.value },
              } as any)
            }
          />
          Estudante
        </label>
      </div>

      <button type="submit" className="button is-primary">
        PEDIR ACESSO
      </button>
    </form>)}
    </>
  );
}
