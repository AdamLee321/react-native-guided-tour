"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
var _reactNative = require("react-native");
var _style = require("../style.js");
var _jsxRuntime = require("react/jsx-runtime");
const Button = ({
  wrapperStyle,
  style,
  ...rest
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
  style: [_style.styles.button, wrapperStyle],
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
    style: [_style.styles.buttonText, style],
    ...rest
  })
});
exports.Button = Button;
//# sourceMappingURL=Button.js.map