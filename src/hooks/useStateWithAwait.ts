import { useEffect, useRef, useState } from 'react';

/**
 * A hook that provides a state setter that can be awaited.
 *
 * @param initialState The initial value of the state.
 * @returns A tuple containing the current state and a setter function that returns a Promise.
 */
export const useStateWithAwait = <T = any>(
  initialState: T
): [T, (newValue: T) => Promise<void>] => {
  const resolvePending = useRef<() => void>(() => {});
  const nextDesiredValue = useRef<T>(initialState);
  const [state, setState] = useState<T>(initialState);

  const setStateWithAwait = async (newState: T) => {
    nextDesiredValue.current = newState;
    setState(newState); // Update state immediately

    // Create a promise that will resolve when the state updates
    await new Promise<void>((resolve) => {
      resolvePending.current = resolve;
    });
  };

  useEffect(() => {
    if (state === nextDesiredValue.current) {
      resolvePending.current(); // Resolve if the state matches the desired state
    }
  }, [state]);

  return [state, setStateWithAwait];
};
