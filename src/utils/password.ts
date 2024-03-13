import { md5 } from "js-md5";

export const getPasswordHash = (password: string) => {
  return md5(password);
};

export const validatePassword = (
  enteredPassword: string,
  targetHash: string
) => {
  return getPasswordHash(enteredPassword) === targetHash;
};
