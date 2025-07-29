import { useState } from 'react';

/**
 * Custom hook for managing modal state with form data
 */
export function useModal<T = string>(initialValue?: T) {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState<T>(initialValue as T);
  const [error, setError] = useState('');

  const open = (initialData?: T) => {
    if (initialData !== undefined) {
      setValue(initialData);
    }
    setOpened(true);
  };

  const close = () => {
    setOpened(false);
    setValue(initialValue as T);
    setError('');
  };

  const updateValue = (newValue: T) => {
    setValue(newValue);
    setError(''); // Clear error when value changes
  };

  const setValidationError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return {
    opened,
    value,
    error,
    open,
    close,
    updateValue,
    setValidationError,
  };
}