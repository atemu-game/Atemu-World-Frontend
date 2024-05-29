import { useCallback, useState } from 'react';

const useSessionStorage = <T>(
  name: string,
  initialValue: T
): [T, (newValue: T) => void] => {
  const getValue = (): T => {
    try {
      const item = window.sessionStorage.getItem(name);
      if (item) {
        const parsedItem = JSON.parse(item);

        return parsedItem.value;
      }
      // return item != null ? JSON.parse(item) : initialValue;
      return initialValue;
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(
        `Cannot get sessionStorage by the given name ${name}:`,
        error.message
      );
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getValue);

  const setValue = useCallback(
    (newValue: T) => {
      try {
        // window.sessionStorage.setItem(name, JSON.stringify(newValue));
        const item = JSON.stringify({
          value: newValue,
        });
        window.sessionStorage.setItem(name, item);
        setStoredValue(newValue);
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(
          `Cannot set sessionStorage by the given name ${name}:`,
          error.message
        );
      }
    },
    [name]
  );

  return [storedValue, setValue];
};

export default useSessionStorage;
