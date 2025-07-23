const MenuPrincipal: React.FC = () => {
  return (
    <nav className={`navbar`} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item ml-1" href="/">
          <figure className="image is-64x64">
            <img src="/LIAO1.png" alt="Logo" />
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

      <div id="navbarBasicExample" className="navbar-menu ml-4">
        <div className="navbar-start">
          <a className="navbar-item" href="/produtos/radar">
            Produtos
          </a>

          <a className="navbar-item" href="/boletins">
            Boletins
          </a>

          <a className="navbar-item" href="/sobre">
            Sobre
          </a>
        </div>
        <div className="navbar-item">
          <p style={{ color: "#0a3d66" }}>
            <strong>LABORATÓRIO DE INTERAÇÃO ATMOSFERA-OCEANO</strong>
          </p>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <a
              className="navbar-item ml-1"
              href="https://www.furg.br"
              target="_blank"
            >
              <figure className="image is-48x48">
                <img src="/FURG_SEM_TEXTO.png" alt="Logo" />
              </figure>
            </a>
            <a
              className="navbar-item ml-1"
              href="https://io.furg.br/"
              target="_blank"
            >
              <figure className="image is-48x48">
                <img src="/IO_SEM_TEXTO.png" alt="Logo" />
              </figure>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MenuPrincipal;
