// Services for CRUD

// We will utilize Local Storage for now but we can integrate
// APIs in the future for enhancement

type LocalStorageProps = {
  key: string;
  value: string | number | object;
};

// Serialize value safely
const serialize = (value: string | number | object): string => {
  return typeof value === "string" ? value : JSON.stringify(value);
};

export const createItem = ({ key, value }: LocalStorageProps) => {
  if (localStorage.getItem(key)) {
    throw new Error(`Item with key "${key}" already exists.`);
  }
  localStorage.setItem(key, serialize(value));
};

export const updateItem = ({ key, value }: LocalStorageProps) => {
  if (!key) return;
  try {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  } catch (err) {
    console.error("Error updating local storage:", err);
  }
};

export const getItem = ({ key }: Omit<LocalStorageProps, "value">) => {
  const data = localStorage.getItem(key);

  if (!data) return undefined;

  return JSON.parse(data);
};
