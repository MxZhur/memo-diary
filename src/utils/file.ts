import {
  BaseDirectory,
  createDir,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { useMemoEntriesStore } from "../stores/memoEntriesStore";
import { useGlobalPasswordStore } from "../stores/globalPasswordStore";

const DB_NAME = "db.memo";

export const saveDb = async () => {
  const memoEntriesStore = useMemoEntriesStore();
  const globalPasswordStore = useGlobalPasswordStore();

  const jsonContent = JSON.stringify({
    globalPassword: globalPasswordStore.passwordHash,
    memoEntries: memoEntriesStore.entries,
  });

  await createDir("memo-diary", {
    dir: BaseDirectory.AppData,
    recursive: true,
  });

  await writeTextFile(DB_NAME, jsonContent, { dir: BaseDirectory.AppData });
};

export const loadDb = async () => {
  try {
    const fileContent = await readTextFile(DB_NAME, {
      dir: BaseDirectory.AppData,
    });

    const jsonContent = JSON.parse(fileContent);

    if (
      jsonContent.globalPassword !== undefined &&
      jsonContent.globalPassword !== null &&
      jsonContent.globalPassword !== ""
    ) {
      const globalPasswordStore = useGlobalPasswordStore();

      globalPasswordStore.loadGlobalPassword(jsonContent.globalPassword);
    }

    if (jsonContent.memoEntries !== undefined) {
      const memoEntriesStore = useMemoEntriesStore();

      memoEntriesStore.loadEntries(jsonContent.memoEntries);
    }
  } catch (error) {}
};
