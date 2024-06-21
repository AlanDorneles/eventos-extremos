import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const ShowMenuConfiguration = createContext();

export const ShowMenuConfigurationProvider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <ShowMenuConfiguration.Provider value={{ showMenu, setShowMenu }}>
      {children}
    </ShowMenuConfiguration.Provider>
  );
};

export const useShowMenuConfiguration = () => {
  return useContext(ShowMenuConfiguration);
};

ShowMenuConfigurationProvider.propTypes = {
  children: PropTypes.any,
};
