"use strict";

import { View, Text } from 'react-native';
import { styles } from "../style.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({
  wrapperStyle,
  style,
  color,
  ...rest
}) => /*#__PURE__*/_jsx(View, {
  style: [styles.button, wrapperStyle],
  children: /*#__PURE__*/_jsx(Text, {
    style: [styles.buttonText, {
      color
    }, style],
    ...rest
  })
});
//# sourceMappingURL=Button.js.map