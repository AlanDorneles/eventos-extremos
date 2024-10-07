export const validateName = (value: string): boolean => value.length > 3;
export const validateEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const validatePassword = (password: string, repeatPassword: string): boolean => {
    return password.length > 6 && password === repeatPassword;
  };
export const validateInstitute = (value: string): boolean => value.length > 0;