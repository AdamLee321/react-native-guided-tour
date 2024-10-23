"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepNumber = void 0;
var _reactNative = require("react-native");
var _TourGuideProvider = require("../../contexts/TourGuideProvider.js");
var _style = require("../style.js");
var _jsxRuntime = require("react/jsx-runtime");
const StepNumber = ({
  style,
  textStyle
}) => {
  const {
    currentStepNumber
  } = (0, _TourGuideProvider.useTourGuide)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [_style.styles.stepNumber, {
      ...style
    }],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [_style.styles.stepNumberText, {
        ...textStyle
      }],
      children: currentStepNumber
    })
  });
};
exports.StepNumber = StepNumber;
//# sourceMappingURL=StepNumber.js.map