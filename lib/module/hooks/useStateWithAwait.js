"use strict";

import { useEffect, useRef, useState } from 'react';

/**
 * A hook that provides a state setter that can be awaited.
 *
 * @param initialState The initial value of the state.
 * @returns A tuple containing the current state and a setter function that returns a Promise.
 */
export const useStateWithAwait = initialState => {
  const resolvePending = useRef(() => {});
  const nextDesiredValue = useRef(initialState);
  const [state, setState] = useState(initialState);
  const setStateWithAwait = async newState => {
    nextDesiredValue.current = newState;
    setState(newState); // Update state immediately

    // Create a promise that will resolve when the state updates
    await new Promise(resolve => {
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
//# sourceMappingURL=useStateWithAwait.js.map