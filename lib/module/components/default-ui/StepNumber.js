"use strict";

import { Text, View } from 'react-native';
import { useTourGuide } from "../../contexts/TourGuideProvider.js";
import { styles } from "../style.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const StepNumber = ({
  color
}) => {
  const {
    currentStepNumber
  } = useTourGuide();
  return /*#__PURE__*/_jsx(View, {
    style: [styles.stepNumber, {
      backgroundColor: color
    }],
    children: /*#__PURE__*/_jsx(Text, {
      style: styles.stepNumberText,
      children: currentStepNumber
    })
  });
};
//# sourceMappingURL=StepNumber.js.map