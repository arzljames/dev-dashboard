// Services for CRUD

import type {
  LocalStorageProps,
  NewTaskItemProps,
  SectionListProps,
} from "../types";

// We will utilize Local Storage for now but we can integrate
// APIs in the future for enhancement

// Serialize value for type safety
const serialize = (value: string | number | object): string => {
  return typeof value === "string" ? value : JSON.stringify(value);
};

// Function to create new item in the local storage
// e.g. entries for task section, task items, etc.
// This will only be called if such entry does not exist
export const createLocalStorageEntry = ({ key, value }: LocalStorageProps) => {
  if (localStorage.getItem(key)) {
    throw new Error(`Item with key "${key}" already exists.`);
  }
  localStorage.setItem(key, serialize(value));
};

const updateItem = ({ key, value }: LocalStorageProps) => {
  if (!key) return;
  try {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  } catch (err) {
    console.error("Error updating local storage:", err);
    throw err;
  }
};

// Function to create new task item
export const createTaskItem = async (
  data: NewTaskItemProps
): Promise<NewTaskItemProps> => {
  try {
    // Checks for existing task entry
    const isTaskEntryExisting = localStorage.getItem("TASKS");

    // If there is no saved existing then create one
    if (!isTaskEntryExisting) {
      createLocalStorageEntry({ key: "TASKS", value: [data] });
      return data;
    }

    const existingItems = JSON.parse(isTaskEntryExisting);
    updateItem({ key: "TASKS", value: [...existingItems, data] });
    return data;
  } catch (error) {
    throw new Error(`Unable to create new task item`);
  }
};

// Function to fetch all sections saved in local storage
export const getSectionList = async (): Promise<SectionListProps[]> => {
  try {
    const sectionsData = localStorage.getItem("STATUS_SECTION");

    if (!sectionsData) return [];

    return JSON.parse(sectionsData);
  } catch (error) {
    throw new Error(`Unable to fetch section list`);
  }
};

// Function to fetch all sections saved in local storage
export const getTasksList = async (
  sectionId?: string | number | undefined
): Promise<NewTaskItemProps[]> => {
  try {
    const tasksData = localStorage.getItem("TASKS");

    if (!tasksData) return [];

    const parsedData = JSON.parse(tasksData);

    if (sectionId) {
      return parsedData.filter(
        (task: NewTaskItemProps) => task.status === sectionId
      );
    }

    return parsedData;
  } catch (error) {
    throw new Error(`Unable to fetch section list`);
  }
};

export const getItem = ({ key }: Omit<LocalStorageProps, "value">) => {
  const data = localStorage.getItem(key);

  if (!data) return undefined;

  return JSON.parse(data);
};
