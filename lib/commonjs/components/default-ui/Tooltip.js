"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _Button = _interopRequireDefault(require("./Button.js"));
var _style = require("../style.js");
var _TourGuideProvider = require("../../contexts/TourGuideProvider.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Tooltip = ({
  labels,
  tooltipTextStyle = {},
  buttonStyle = {},
  buttonTextStyle = {}
}) => {
  const {
    goToNext,
    goToPrev,
    stop,
    currentStep,
    isFirstStep,
    isLastStep
  } = (0, _TourGuideProvider.useTourGuide)();
  const handleStop = () => stop();
  const handleNext = () => goToNext();
  const handlePrev = () => goToPrev();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: _style.styles.tooltipContainer,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        testID: "stepDescription",
        style: [_style.styles.tooltipText, tooltipTextStyle],
        children: currentStep?.text
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _style.styles.bottomBar,
      children: [!isLastStep && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
        style: buttonStyle,
        textStyle: buttonTextStyle,
        onPress: handleStop,
        children: labels.skip
      }), !isFirstStep && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
        style: buttonStyle,
        textStyle: buttonTextStyle,
        onPress: handlePrev,
        children: labels.previous
      }), !isLastStep ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
        style: buttonStyle,
        textStyle: buttonTextStyle,
        onPress: handleNext,
        children: labels.next
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
        style: buttonStyle,
        textStyle: buttonTextStyle,
        onPress: handleStop,
        children: labels.finish
      })]
    })]
  });
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(Tooltip);
//# sourceMappingURL=Tooltip.js.map