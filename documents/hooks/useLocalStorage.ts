import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

interface UseLocalStorageOptions {
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
  onError?: (error: Error) => void;
}

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prevValue: T) => T)) => Promise<void>;
  removeValue: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

/**
 * @param key - The storage key
 * @param initialValue - Initial value if no stored value exists
 * @param options - Additional options for serialization and error handling
 * @returns Object with value, setValue, removeValue, isLoading, and error
 */
const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions = {}
): UseLocalStorageReturn<T> => {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    onError = (error) =>
      console.error(`LocalStorage error for key "${key}":`, error),
  } = options;

  const [value, setValueState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load value from storage on mount
  useEffect(() => {
    const loadValue = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const item = await AsyncStorage.getItem(key);
        if (item !== null) {
          const parsedValue = deserialize(item);
          setValueState(parsedValue);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        onError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadValue();
  }, [key, deserialize, onError]);

  const setValue = useCallback(
    async (newValue: T | ((prevValue: T) => T)) => {
      try {
        setError(null);

        const valueToStore =
          typeof newValue === "function"
            ? (newValue as (prevValue: T) => T)(value)
            : newValue;

        setValueState(valueToStore);

        const serializedValue = serialize(valueToStore);
        await AsyncStorage.setItem(key, serializedValue);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        onError(error);

        setValueState(value);
      }
    },
    [key, value, serialize, onError]
  );

  const removeValue = useCallback(async () => {
    try {
      setError(null);
      setValueState(initialValue);
      await AsyncStorage.removeItem(key);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      onError(error);
    }
  }, [key, initialValue, onError]);

  return {
    value,
    setValue,
    removeValue,
    isLoading,
    error,
  };
};

export default useLocalStorage;
