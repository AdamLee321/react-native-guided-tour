"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _TourGuideProvider = require("../../contexts/TourGuideProvider.js");
var _style = require("../style.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const StepNumber = ({
  style = {},
  textStyle = {}
}) => {
  const {
    currentStepNumber
  } = (0, _TourGuideProvider.useTourGuide)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [_style.styles.stepNumber, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [_style.styles.stepNumberText, textStyle],
      children: currentStepNumber
    })
  });
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(StepNumber);
//# sourceMappingURL=StepNumber.js.map