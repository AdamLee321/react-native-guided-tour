"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStateWithAwait = void 0;
var _react = require("react");
/**
 * A hook like useState that allows you to use await the setter
 */
const useStateWithAwait = initialState => {
  const endPending = (0, _react.useRef)(() => {});
  const newDesiredValue = (0, _react.useRef)(initialState);
  const [state, setState] = (0, _react.useState)(initialState);
  const setStateWithAwait = async newState => {
    const pending = new Promise(resolve => {
      endPending.current = resolve;
    });
    newDesiredValue.current = newState;
    setState(newState);
    await pending;
  };
  (0, _react.useEffect)(() => {
    if (state === newDesiredValue.current) {
      endPending.current();
    }
  }, [state]);
  return [state, setStateWithAwait];
};
exports.useStateWithAwait = useStateWithAwait;
//# sourceMappingURL=useStateWithAwait.js.map