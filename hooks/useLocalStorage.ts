import { useCallback, useState } from 'react';

const useLocalStorage = <T>(
  name: string,
  initialValue: T,
  expiredTime?: number
): [T, (newValue: T) => void] => {
  const getValue = (): T => {
    try {
      const item = window.localStorage.getItem(name);
      if (item) {
        const parsedItem = JSON.parse(item);
        if (parsedItem.expiredTime && Date.now() > parsedItem.expiredTime) {
          window.localStorage.removeItem(name);
          return initialValue;
        }
        return parsedItem.value;
      }
      // return item != null ? JSON.parse(item) : initialValue;
      return initialValue;
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(
        `Cannot get localStorage by the given name ${name}:`,
        error.message
      );
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getValue);

  const setValue = useCallback(
    (newValue: T) => {
      try {
        // window.localStorage.setItem(name, JSON.stringify(newValue));
        const item = JSON.stringify({
          value: newValue,
          expiredTime: expiredTime,
        });
        window.localStorage.setItem(name, item);
        setStoredValue(newValue);
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(
          `Cannot set localStorage by the given name ${name}:`,
          error.message
        );
      }
    },
    [name]
  );

  return [storedValue, setValue];
};

export default useLocalStorage;
