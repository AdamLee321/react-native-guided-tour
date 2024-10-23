"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireDefault(require("react"));
var _style = require("../style.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Button = ({
  wrapperStyle = {},
  style = {},
  textStyle = {},
  ...rest
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [_style.styles.button, wrapperStyle, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [_style.styles.buttonText, textStyle],
      ...rest
    })
  });
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(Button);
//# sourceMappingURL=Button.js.map