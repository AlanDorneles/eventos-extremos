import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
export default function MenuPrincipal() {
  const {logout,user} = useAuth()
  const [hidden, setHidden] = useState({
    ButtonFurgHovered: true,
    ButtonWindyHovered: true,
    IsHidden: "is-hidden",
  });

  const [isActive, setIsActive] = useState(false);    
  const toggleDropdown = () => {
        setIsActive(!isActive);
      };

  const hiddenButtonEnterWindy = () => {
    setHidden((prevState) => ({ ...prevState, ButtonWindyHovered: false }));
    ("enter");
  };

  const hiddenButtonLeaveWindy = () => {
    setHidden((prevState) => ({ ...prevState, ButtonWindyHovered: true }));
  };

  const hiddenButtonEnterFurg = () => {
    setHidden((prevState) => ({ ...prevState, ButtonFurgHovered: false }));
  };

  const hiddenButtonLeaveFurg = () => {
    setHidden((prevState) => ({ ...prevState, ButtonFurgHovered: true }));
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          {/*<img src="/Logo.png" alt="logo_comite_eventos_extremos"/>*/}
          <img src="/Logo.png" alt="" />
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

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" href="/">
            Início
          </a>

          <a className="navbar-item" href="/produtos/satelite">
            Produtos
          </a>

          <a className="navbar-item" href="/boletins">
            Boletins
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item  is-flex-direction-row is-justify-content-center is-align-items-center">
            <div className="buttons mb-0">
              <a
                className="button-is-rounded mr-1"
                href="/"
                onMouseEnter={hiddenButtonEnterFurg}
                onMouseLeave={hiddenButtonLeaveFurg}
              >
                {hidden.ButtonFurgHovered ? (
                  <figure
                    className="image is-24x24"
                    style={{
                      opacity: location.pathname === "/windy" ? 0.7 : 1,
                    }}
                  >
                    <img src="/logo-furg.png" alt="" />
                  </figure>
                ) : (
                  ""
                )}
                {!hidden.ButtonFurgHovered && (
                  <button className="button is-primary has-text-white">
                    <figure className="image is-24x24">
                      <img src="/logo-furg.png" alt="" />
                    </figure>
                    <p className="ml-2">IR PARA FURG</p>
                  </button>
                )}
              </a>
              <a
                className="button-is-rounded mr-6"
                onMouseEnter={hiddenButtonEnterWindy}
                onMouseLeave={hiddenButtonLeaveWindy}
                href="/windy"
              >
                {hidden.ButtonWindyHovered ? (
                  <figure
                    className="image is-24x24"
                    style={{ opacity: location.pathname === "/" ? 0.7 : 1 }}
                  >
                    <img src="/windy.png" alt="" />
                  </figure>
                ) : (
                  ""
                )}
                {!hidden.ButtonWindyHovered && (
                  <button
                    className="button has-text-white"
                    style={{ backgroundColor: "#A51E25" }}
                  >
                    <figure className="image is-24x24">
                      <img src="/windy.png" alt="" />
                    </figure>
                    <p className="ml-2"> IR PARA WINDY</p>
                  </button>
                )}
              </a>

              {/*<button className="button is-rounded is-text mr-4" onClick={handleShowMenu}>
                  <figure className="image is-24x24">
                    <img src="/setting.svg" alt="" />
                  </figure>
                </button>*/}
            </div>
            <div className={`dropdown ${isActive ? "is-active" : ""} mr-6`}>
              <div className="dropdown-trigger is-flex is-justify-content-space-between is-align-items-center">
                <button
                  className="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  onClick={toggleDropdown}
                >
                  <figure className="image is-32x32"  >
                    <img
                      className="is-rounded"
                      src="https://bulma.io/assets/images/placeholders/128x128.png" aria-hidden="true"  alt="Profile"
                    />
                  </figure>
                </button>
                <p>{user.nome}</p>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <a href="#" className="dropdown-item">
                    {" "}
                   
                    {" "}
                  </a>
                    <a className="dropdown-item"  href="/profile">  Perfil </a>
                  
                  <a href="#" className="dropdown-item " onClick={logout}>
                    {" "}
                    Sair{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
