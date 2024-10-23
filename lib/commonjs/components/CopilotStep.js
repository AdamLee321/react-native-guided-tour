"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopilotStep = void 0;
var _react = _interopRequireWildcard(require("react"));
var _CopilotProvider = require("../contexts/CopilotProvider.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CopilotStep = ({
  name,
  order,
  text,
  children,
  active = true
}) => {
  const registeredName = (0, _react.useRef)(null);
  const {
    registerStep,
    unregisterStep
  } = (0, _CopilotProvider.useCopilot)();
  const wrapperRef = _react.default.useRef(null);
  const measure = async () => {
    return await new Promise(resolve => {
      const measure = () => {
        // Wait until the wrapper element appears
        if (wrapperRef.current != null && 'measure' in wrapperRef.current) {
          wrapperRef.current.measure((_ox, _oy, width, height, x, y) => {
            resolve({
              x,
              y,
              width,
              height
            });
          });
        } else {
          requestAnimationFrame(measure);
        }
      };
      measure();
    });
  };
  (0, _react.useEffect)(() => {
    if (active) {
      if (registeredName.current && registeredName.current !== name) {
        unregisterStep(registeredName.current);
      }
      registerStep({
        name,
        text,
        order,
        measure,
        wrapperRef,
        visible: true
      });
      registeredName.current = name;
    }
  }, [name, order, text, registerStep, unregisterStep, active]);
  (0, _react.useEffect)(() => {
    if (active) {
      return () => {
        if (registeredName.current) {
          unregisterStep(registeredName.current);
        }
      };
    }
    return undefined;
  }, [name, unregisterStep, active]);
  const copilotProps = (0, _react.useMemo)(() => ({
    ref: wrapperRef,
    onLayout: () => {} // Android hack
  }), []);
  return /*#__PURE__*/_react.default.cloneElement(children, {
    copilot: copilotProps
  });
};
exports.CopilotStep = CopilotStep;
//# sourceMappingURL=CopilotStep.js.map