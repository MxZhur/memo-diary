import { defineStore } from "pinia";
import { ref } from "vue";
import { getPasswordHash } from "../utils/password";
import { saveDb } from "../utils/file";

export const useGlobalPasswordStore = defineStore("globalPassword", () => {
  const passwordHash = ref<string | null>(null);
  const accessGranted = ref(false);

  const setGlobalPassword = (newPassword: string) => {
    passwordHash.value = getPasswordHash(newPassword);

    saveDb();
  };

  const clearGlobalPassword = () => {
    passwordHash.value = null;

    saveDb();
  };

  const loadGlobalPassword = (newPasswordHash: string) => {
    passwordHash.value = newPasswordHash;
  };

  const setAccessGranted = (newValue: boolean) => {
    accessGranted.value = newValue;
  };

  return {
    passwordHash,
    setGlobalPassword,
    clearGlobalPassword,
    loadGlobalPassword,
    accessGranted,
    setAccessGranted,
  };
});
