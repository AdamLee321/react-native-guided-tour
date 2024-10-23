"use strict";

import { View, Text } from 'react-native';
import React from 'react';
import { styles } from "../style.js";
import { jsx as _jsx } from "react/jsx-runtime";
const Button = ({
  wrapperStyle = {},
  style = {},
  textStyle = {},
  ...rest
}) => {
  return /*#__PURE__*/_jsx(View, {
    style: [styles.button, wrapperStyle, style],
    children: /*#__PURE__*/_jsx(Text, {
      style: [styles.buttonText, textStyle],
      ...rest
    })
  });
};
export default /*#__PURE__*/React.memo(Button);
//# sourceMappingURL=Button.js.map