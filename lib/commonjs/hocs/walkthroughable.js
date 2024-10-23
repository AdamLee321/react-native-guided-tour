"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.walkthroughable = walkthroughable;
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function walkthroughable(WrappedComponent) {
  const Component = props => {
    const {
      TourGuide,
      ...rest
    } = props;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
      ...TourGuide,
      ...rest
    });
  };
  Component.displayName = 'Walkthroughable';
  return Component;
}
//# sourceMappingURL=walkthroughable.js.map