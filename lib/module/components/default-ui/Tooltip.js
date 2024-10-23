"use strict";

import { Text, TouchableOpacity, View } from 'react-native';
import { Button } from "./Button.js";
import { styles } from "../style.js";
import { useTourGuide } from "../../contexts/TourGuideProvider.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Tooltip = ({
  labels,
  tooltipTextStyle,
  buttonStyle,
  buttonTextStyle
}) => {
  const {
    goToNext,
    goToPrev,
    stop,
    currentStep,
    isFirstStep,
    isLastStep
  } = useTourGuide();
  const handleStop = () => {
    void stop();
  };
  const handleNext = () => {
    void goToNext();
  };
  const handlePrev = () => {
    void goToPrev();
  };
  return /*#__PURE__*/_jsxs(View, {
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.tooltipContainer,
      children: /*#__PURE__*/_jsx(Text, {
        testID: "stepDescription",
        style: [styles.tooltipText, tooltipTextStyle],
        children: currentStep?.text
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: [styles.bottomBar],
      children: [!isLastStep ? /*#__PURE__*/_jsx(TouchableOpacity, {
        onPress: handleStop,
        children: /*#__PURE__*/_jsx(Button, {
          style: buttonStyle,
          textStyle: buttonTextStyle,
          children: labels.skip
        })
      }) : null, !isFirstStep ? /*#__PURE__*/_jsx(TouchableOpacity, {
        onPress: handlePrev,
        children: /*#__PURE__*/_jsx(Button, {
          style: buttonStyle,
          textStyle: buttonTextStyle,
          children: labels.previous
        })
      }) : null, !isLastStep ? /*#__PURE__*/_jsx(TouchableOpacity, {
        onPress: handleNext,
        children: /*#__PURE__*/_jsx(Button, {
          style: buttonStyle,
          textStyle: buttonTextStyle,
          children: labels.next
        })
      }) : /*#__PURE__*/_jsx(TouchableOpacity, {
        onPress: handleStop,
        children: /*#__PURE__*/_jsx(Button, {
          style: buttonStyle,
          textStyle: buttonTextStyle,
          children: labels.finish
        })
      })]
    })]
  });
};
//# sourceMappingURL=Tooltip.js.map