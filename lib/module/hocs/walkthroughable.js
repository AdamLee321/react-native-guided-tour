"use strict";

import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export function walkthroughable(WrappedComponent) {
  const Component = props => {
    const {
      TourGuide,
      ...rest
    } = props;
    return /*#__PURE__*/_jsx(WrappedComponent, {
      ...TourGuide,
      ...rest
    });
  };
  Component.displayName = 'Walkthroughable';
  return Component;
}
//# sourceMappingURL=walkthroughable.js.map