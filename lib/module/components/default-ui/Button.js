"use strict";

import { View, Text } from 'react-native';
import { styles } from "../style.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({
  wrapperStyle,
  style,
  textStyle,
  ...rest
}) => /*#__PURE__*/_jsx(View, {
  style: [styles.button, wrapperStyle, style],
  children: /*#__PURE__*/_jsx(Text, {
    style: [styles.buttonText, textStyle],
    ...rest
  })
});
//# sourceMappingURL=Button.js.map