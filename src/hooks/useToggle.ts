import { useState, useCallback } from 'react';

/**
 * Custom hook for managing boolean toggle state
 */
export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, { toggle, setTrue, setFalse, setValue }] as const;
}

/**
 * Custom hook for managing multiple toggle states
 */
export function useMultipleToggle<T extends Record<string, boolean>>(initialState: T) {
  const [state, setState] = useState(initialState);

  const toggle = useCallback((key: keyof T) => {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const setTrue = useCallback((key: keyof T) => {
    setState(prev => ({ ...prev, [key]: true }));
  }, []);

  const setFalse = useCallback((key: keyof T) => {
    setState(prev => ({ ...prev, [key]: false }));
  }, []);

  const setValue = useCallback((key: keyof T, value: boolean) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  return { state, toggle, setTrue, setFalse, setValue };
}