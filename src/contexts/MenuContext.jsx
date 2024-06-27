import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [showMenu, setShowMenu] = useState(true);

    useEffect(() => {
        localStorage.setItem('showMenu', JSON.stringify(showMenu));
    }, [showMenu]);

    return (
        <MenuContext.Provider value={{ showMenu, setShowMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = () => {
    return useContext(MenuContext);
};

MenuProvider.propTypes = {
    children: PropTypes.any,
};
