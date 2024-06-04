import { Link } from "react-router-dom";
import logoFurg from "../../public/logo-furg.png";
import { IoHomeOutline } from "react-icons/io5";
import { GiSattelite } from "react-icons/gi";
import '../sass/navbar.scss'
import styles from './sidebar.module.css'
import { useState } from "react";

export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <a className={styles.navbarItem} href="/">
          <img src={logoFurg} alt="logo-furg" className={styles.navbarLogo} />
        </a>
        <div
          className={`${styles.navbarBurguer} ${isActive ? "is-active" : ""}`}
          onClick={toggleMenu}
        >
        </div>
      </div>

      <div className={`${styles.navbarMenu} ${isActive ? "is-active" : ""}`}>
        <div className={styles.navbarStart}>
          <Link to="/" className={styles.navbarItem}>
            <IoHomeOutline className={styles.Icon} />
              Home
          </Link>
          <Link to="/satelite" className={styles.navbarItem}>
          <GiSattelite className={styles.Icon}/>
            Satélite
          </Link>
        </div>
      </div>
    </nav>
  );
};
