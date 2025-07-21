const MenuPrincipal: React.FC = () => {
  return (
    <nav
      className={`navbar`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item ml-1" href="/">
          <figure className="image is-56x56">
            <img src="/LIAO2.png" alt="Logo" />
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
      </div>
    </nav>
  );
};

export default MenuPrincipal;
