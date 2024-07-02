import { useState } from "react";
import { useShowMenuConfiguration } from "../../contexts/showMenu";

export default function MenuPrincipal() {
  const { showMenu, setShowMenu } = useShowMenuConfiguration();
  const [hidden, setHidden] = useState({
    ButtonFurgHovered: true,
    ButtonWindyHovered: true,
    IsHidden: "is-hidden",
  });

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  const hiddenButtonEnterWindy = () => {
    setHidden((prevState) => ({ ...prevState, ButtonWindyHovered: false }));
    console.log("enter");
  };

  const hiddenButtonLeaveWindy = () => {
    setHidden((prevState) => ({ ...prevState, ButtonWindyHovered: true }));
    console.log("leave");
  };

  const hiddenButtonEnterFurg = () => {
    setHidden((prevState) => ({ ...prevState, ButtonFurgHovered: false }));
    console.log("enter");
  };

  const hiddenButtonLeaveFurg = () => {
    setHidden((prevState) => ({ ...prevState, ButtonFurgHovered: true }));
    console.log("leave");
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          {/*<img src="../../public/Logo.png" alt="logo_comite_eventos_extremos"/>*/}
          <img src="../../public/Logo.png" alt="" />
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

          <a className="navbar-item" href="/sobre">
            Sobre
          </a>

          <a className="navbar-item" href="/boletins">
            Boletins
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
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
                    <img src="../../public/logo-furg.png" alt="" />
                  </figure>
                ) : (
                  ""
                )}
                {!hidden.ButtonFurgHovered && (
                  <button className="button is-primary has-text-white">
                    <figure className="image is-24x24">
                      <img src="../../public/logo-furg.png" alt="" />
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
                    <img src="../../public/windy.png" alt="" />
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
                      <img src="../../public/windy.png" alt="" />
                    </figure>
                    <p className="ml-2"> IR PARA WINDY</p>
                  </button>
                )}
              </a>

              
                <button className="button is-rounded is-text mr-4" onClick={handleShowMenu}>
                  <figure className="image is-24x24">
                    <img src="../../public/setting.svg" alt="" />
                  </figure>
                </button>
             
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
