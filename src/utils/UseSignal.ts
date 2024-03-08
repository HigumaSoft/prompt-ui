function useSignal<T>(): [
  (...args: T[]) => void,
  (callback: (...args: T[]) => void) => void
] {
  let storedCallback: ((...args: T[]) => void) | null = null;

  function setCallback(callback: (...args: T[]) => void): void {
    storedCallback = callback;
  }
  function callCallback(...args: T[]): void {
    if (!storedCallback) {
      return;
    }
    storedCallback(...args);
  }

  return [callCallback, setCallback];
}

export { useSignal };
