import { createContext, useState, useContext, ReactNode } from "react";

type ButtonSatContextType = {
  CPPMET: boolean;
  setCPPMET: (value: boolean) => void;
  INPE: boolean;
  setINPE: (value: boolean) => void;
  toggleSource: (value: "CPPMET" | "INPE") => void;
};

export const ButtonSatContext = createContext<ButtonSatContextType | undefined>(
  undefined
);

type ProviderProps = {
  children: ReactNode;
};

export const ButtonSatProvider = ({ children }: ProviderProps) => {
  const [CPPMET, setCPPMET] = useState(false);
  const [INPE, setINPE] = useState(true);

  const toggleSource = (value: "CPPMET" | "INPE") => {
    setCPPMET(value === "CPPMET");
    setINPE(value === "INPE");
  };

  return (
    <ButtonSatContext.Provider
      value={{ CPPMET, setCPPMET, INPE, setINPE, toggleSource }}
    >
      {children}
    </ButtonSatContext.Provider>
  );
};

export const useButtonSat = (): ButtonSatContextType => {
  const context = useContext(ButtonSatContext);
  if (!context) {
    throw new Error(
      "useButtonSat deve ser usado dentro de um ButtonSatProvider"
    );
  }
  return context;
};
