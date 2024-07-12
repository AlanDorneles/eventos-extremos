export const filterCheckeds = (checkeds: { [key: string]: boolean }): string[] => {
    return Object.keys(checkeds).filter(key => checkeds[key]);
  };