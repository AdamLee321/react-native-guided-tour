"use strict";

import { useEffect, useRef, useState } from 'react';

/**
 * A hook like useState that allows you to use await the setter
 */
export const useStateWithAwait = initialState => {
  const endPending = useRef(() => {});
  const newDesiredValue = useRef(initialState);
  const [state, setState] = useState(initialState);
  const setStateWithAwait = async newState => {
    const pending = new Promise(resolve => {
      endPending.current = resolve;
    });
    newDesiredValue.current = newState;
    setState(newState);
    await pending;
  };
  useEffect(() => {
    if (state === newDesiredValue.current) {
      endPending.current();
    }
  }, [state]);
  return [state, setStateWithAwait];
};
//# sourceMappingURL=useStateWithAwait.js.map