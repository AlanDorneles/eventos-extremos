export interface RadarMenuProps {
    getHourScopeRadar: number;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    actualHour: number;
    initHour: number;
    clickedButtonId: number | null;
    selectIndex: (index: number) => void;
    buttonStyle: React.CSSProperties;
    cangucuChecked: boolean;
    handleCangucuChange: (checked: boolean) => void;
    morroDaIgrejaChecked: boolean;
    handleMorroDaIgrejaChange: (checked: boolean) => void;
    santiagoChecked: boolean;
    handleSantiagoChange: (checked: boolean) => void;
    selectedOption: string;
    handleRadioButtonChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean;
    handleCheckBoxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }