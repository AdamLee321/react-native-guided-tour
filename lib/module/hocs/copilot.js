"use strict";

import { TourGuideProvider, useTourGuide } from "../contexts/TourGuideProvider.js";
import { jsx as _jsx } from "react/jsx-runtime";
const ComponentWithTourGuideContext = WrappedComponent => {
  const Component = props => {
    const TourGuide = useTourGuide();
    return /*#__PURE__*/_jsx(WrappedComponent, {
      ...props,
      ...TourGuide
    });
  };
  Component.displayName = `TourGuideInjector(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;
  return Component;
};

/**
 * @deprecated The HOC is deprecated. Please use `TourGuideProvider` instead.
 */
export function TourGuide(options) {
  return WrappedComponent => {
    const OuterComponent = props => {
      const InnerComponentWithTourGuideContext = ComponentWithTourGuideContext(WrappedComponent);
      return /*#__PURE__*/_jsx(TourGuideProvider, {
        ...options,
        children: /*#__PURE__*/_jsx(InnerComponentWithTourGuideContext, {
          ...props
        })
      });
    };
    OuterComponent.displayName = `TourGuide(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;
    return OuterComponent;
  };
}
//# sourceMappingURL=copilot.js.map