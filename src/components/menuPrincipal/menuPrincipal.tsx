import { NavLink } from "react-router-dom";
import { MdDashboard, MdArticle, MdInfo } from "react-icons/md";

const navItems = [
  { to: "/", label: "Produtos", icon: MdDashboard },
  { to: "/boletins", label: "Boletins", icon: MdArticle },
  { to: "/sobre", label: "Sobre", icon: MdInfo },
];

const MenuPrincipal: React.FC = () => {
  return (
    <nav className="m3-bottom-nav" aria-label="Navegação principal">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={`mobile-${item.to}`}
            to={item.to}
            className={({ isActive }) =>
              `m3-bottom-item ${isActive ? "is-active" : ""}`
            }
          >
            <span className="m3-bottom-indicator">
              <Icon className="m3-bottom-icon" />
            </span>
            <span className="m3-bottom-label">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default MenuPrincipal;
