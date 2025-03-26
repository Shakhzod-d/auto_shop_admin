export const getLocaleStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const setLocaleStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const removeLocaleStorage = (key: string) => {
  localStorage.removeItem(key);
};
