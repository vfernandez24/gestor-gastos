export const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

export const saveToStorage = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data));
};
