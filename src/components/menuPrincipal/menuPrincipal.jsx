export default function MenuPrincipal() {
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
          <a className="navbar-item" href="/">Início</a>

          <a className="navbar-item" href="/sobre">Sobre</a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
    
              <a className="button-is-rounded" href="/">
                <figure className="image is-24x24">
                <img src="../../public/logo-furg.png" alt="" />
                </figure>
              </a>
              <a className="button-is-rounded">
                <figure className="image is-24x24">
                    <img src="../../public/windy.png" alt="" />
                </figure>
              </a>
              <a className="button-is-rounded">
                <figure className="image is-24x24">
                    <img src="../../public/setting.svg" alt="" />
                </figure>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
