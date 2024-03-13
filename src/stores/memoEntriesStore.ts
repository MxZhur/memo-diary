import dayjs from "dayjs";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getPasswordHash } from "../utils/password";
import { saveDb } from "../utils/file";

export type MemoEntry = {
  id: string;
  title: string;
  passwordHash: string | null;
  datetime: number;
  rating: number;
  keywords: string[];
  description: string;
};

export type MemoEntryFormFields = {
  title: string;
  password: string;
  datetime: string;
  rating: number;
  keywords: string;
  description: string;
};

export type MemoEntrySearchFields = {
  text: string;
  minDatetime: string;
  maxDatetime: string;
  minRating: number;
  maxRating: number;
  keywords: string;
};

export const useMemoEntriesStore = defineStore("memoEntries", () => {
  const entries = ref<MemoEntry[]>([]);

  const addEntry = (formFields: MemoEntryFormFields) => {
    let newEntry: MemoEntry = {
      ...formFields,
      id: dayjs().unix().toString(),
      passwordHash: null,
      keywords: formFields.keywords
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
      datetime: dayjs(formFields.datetime).unix(),
    };

    if (formFields.password !== "") {
      newEntry.passwordHash = getPasswordHash(formFields.password);
    }

    entries.value.unshift(newEntry);

    saveDb();
  };

  const loadEntries = (newEntries: MemoEntry[]) => {
    entries.value = newEntries;
  };

  const latestEntries = computed(() => {
    return entries.value.slice(0, 20);
  });

  const searchEntries = (searchFields: MemoEntrySearchFields) => {
    const allEntries = entries.value;

    let minDateUnix: number;
    if (searchFields.minDatetime !== "") {
      minDateUnix = dayjs(searchFields.minDatetime).unix();
    } else {
      minDateUnix = dayjs().unix();
    }
    let maxDateUnix: number;
    if (searchFields.minDatetime !== "") {
      maxDateUnix = dayjs(searchFields.maxDatetime).add(1, "day").unix();
    } else {
      maxDateUnix = dayjs().add(1, "day").unix();
    }

    const keywords: string[] = searchFields.keywords
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    return allEntries
      .filter(
        (e) =>
          searchFields.text === "" ||
          e.title.includes(searchFields.text) ||
          e.description.includes(searchFields.text)
      )
      .filter(
        (e) =>
          (searchFields.minDatetime === "" || e.datetime >= minDateUnix) &&
          (searchFields.maxDatetime === "" || e.datetime <= maxDateUnix)
      )
      .filter(
        (e) =>
          e.rating >= searchFields.minRating &&
          e.rating <= searchFields.maxRating
      )
      .filter(
        (e) =>
          searchFields.keywords === "" ||
          e.keywords.some((kw) => keywords.includes(kw))
      );
  };

  return { entries, latestEntries, addEntry, loadEntries, searchEntries };
});
