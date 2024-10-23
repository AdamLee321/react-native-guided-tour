"use strict";

import { View, Text } from 'react-native';
import { styles } from "../style.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({
  wrapperStyle,
  style,
  ...rest
}) => /*#__PURE__*/_jsx(View, {
  style: [styles.button, wrapperStyle],
  children: /*#__PURE__*/_jsx(Text, {
    style: [styles.buttonText, style],
    ...rest
  })
});
//# sourceMappingURL=Button.js.map