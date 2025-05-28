// Services for CRUD

// We will utilize Local Storage for now but we can integrate
// APIs in the future for enhancement

type LocalStorageProps = {
  key: string;
  value: string | number | object;
};

export type NewTaskItemProps = {
  id: string;
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  effortDays: number;
  endDate: string;
};

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

export const getItem = ({ key }: Omit<LocalStorageProps, "value">) => {
  const data = localStorage.getItem(key);

  if (!data) return undefined;

  return JSON.parse(data);
};
