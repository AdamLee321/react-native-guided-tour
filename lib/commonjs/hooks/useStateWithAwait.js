"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStateWithAwait = void 0;
var _react = require("react");
/**
 * A hook that provides a state setter that can be awaited.
 *
 * @param initialState The initial value of the state.
 * @returns A tuple containing the current state and a setter function that returns a Promise.
 */
const useStateWithAwait = initialState => {
  const resolvePending = (0, _react.useRef)(() => {});
  const nextDesiredValue = (0, _react.useRef)(initialState);
  const [state, setState] = (0, _react.useState)(initialState);
  const setStateWithAwait = async newState => {
    nextDesiredValue.current = newState;
    setState(newState); // Update state immediately

    // Create a promise that will resolve when the state updates
    await new Promise(resolve => {
      resolvePending.current = resolve;
    });
  };
  (0, _react.useEffect)(() => {
    if (state === nextDesiredValue.current) {
      resolvePending.current(); // Resolve if the state matches the desired state
    }
  }, [state]);
  return [state, setStateWithAwait];
};
exports.useStateWithAwait = useStateWithAwait;
//# sourceMappingURL=useStateWithAwait.js.map