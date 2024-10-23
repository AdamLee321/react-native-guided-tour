"use strict";

import React from 'react';
import { Text, View } from 'react-native';
import Button from "./Button.js";
import { styles } from "../style.js";
import { useTourGuide } from "../../contexts/TourGuideProvider.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  } = useTourGuide();
  const handleStop = () => stop();
  const handleNext = () => goToNext();
  const handlePrev = () => goToPrev();
  return /*#__PURE__*/_jsxs(View, {
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.tooltipContainer,
      children: /*#__PURE__*/_jsx(Text, {
        testID: "stepDescription",
        style: [styles.tooltipText, tooltipTextStyle],
        children: currentStep?.text
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.bottomBar,
      children: [!isLastStep && /*#__PURE__*/_jsx(Button, {
        style: buttonStyle,
        textStyle: buttonTextStyle,
        onPress: handleStop,
        children: labels.skip
      }), !isFirstStep && /*#__PURE__*/_jsx(Button, {
        style: buttonStyle,
        textStyle: buttonTextStyle,
        onPress: handlePrev,
        children: labels.previous
      }), !isLastStep ? /*#__PURE__*/_jsx(Button, {
        style: buttonStyle,
        textStyle: buttonTextStyle,
        onPress: handleNext,
        children: labels.next
      }) : /*#__PURE__*/_jsx(Button, {
        style: buttonStyle,
        textStyle: buttonTextStyle,
        onPress: handleStop,
        children: labels.finish
      })]
    })]
  });
};
export default /*#__PURE__*/React.memo(Tooltip);
//# sourceMappingURL=Tooltip.js.map