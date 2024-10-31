import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { MenuPrincipalProps } from "../../interfaces/App.ts";

const MenuPrincipal: React.FC<MenuPrincipalProps> = ({ id, className }) => {
  const { logout, user, token } = useAuth();
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  return (
    <nav
      id={id}
      className={`navbar ${className}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item ml-4" href="/">
          <figure className="image is-48x48">
            <img src="/logo-furg.png" alt="Logo" />
          </figure>
        </a>
        <a className="navbar-item ml-1" href="/">
          <figure className="image is-48x48">
            <img src="/logo_IO.png" alt="Logo" />
          </figure>
        </a>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu ml-6">
        <div className="navbar-start">
          {/* <a className="navbar-item" href="/produtos/satelite">
            Início
          </a> */}

          <a className="navbar-item" href="/produtos/satelite">
            Produtos
          </a>

          <a className="navbar-item" href="/boletins">
            Boletins
          </a>

          <a className="navbar-item" href="/sobre">
            Sobre
          </a>
        </div>

        <div className="navbar-end mr-6">
          {token ? (
            <div className={`dropdown ${isActive ? "is-active" : ""} mr-6`}>
              <div className="dropdown-trigger is-flex is-justify-content-space-between is-align-items-center">
                <button
                  className="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  onClick={toggleDropdown}
                >
                  <figure className="image is-32x32">
                    <img
                      className="is-rounded"
                      src="https://bulma.io/assets/images/placeholders/128x128.png"
                      aria-hidden="true"
                      alt="Profile"
                    />
                  </figure>
                </button>
                <p>{user?.nome}</p>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <a href="#" className="dropdown-item">
                    {" "}
                  </a>

                  <div>
                    <a className="dropdown-item" href="/profile">
                      {" "}
                      Perfil{" "}
                    </a>

                    <a href="#" className="dropdown-item " onClick={logout}>
                      {" "}
                      Sair{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <a className="button is-primary m-auto" href="/login">
              LOGIN
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MenuPrincipal;
