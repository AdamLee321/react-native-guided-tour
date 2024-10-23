"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TourGuide = TourGuide;
var _TourGuideProvider = require("../contexts/TourGuideProvider.js");
var _jsxRuntime = require("react/jsx-runtime");
const ComponentWithTourGuideContext = WrappedComponent => {
  const Component = props => {
    const TourGuide = (0, _TourGuideProvider.useTourGuide)();
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
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
function TourGuide(options) {
  return WrappedComponent => {
    const OuterComponent = props => {
      const InnerComponentWithTourGuideContext = ComponentWithTourGuideContext(WrappedComponent);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TourGuideProvider.TourGuideProvider, {
        ...options,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(InnerComponentWithTourGuideContext, {
          ...props
        })
      });
    };
    OuterComponent.displayName = `TourGuide(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;
    return OuterComponent;
  };
}
//# sourceMappingURL=copilot.js.map