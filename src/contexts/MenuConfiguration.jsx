import { createContext, useState,useContext} from "react";
import PropTypes from 'prop-types'

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <MenuContext.Provider value={{ showMenu, setShowMenu}}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = () => {
    return useContext(MenuContext);
  };

MenuProvider.propTypes = {
    children: PropTypes.any,
  }
