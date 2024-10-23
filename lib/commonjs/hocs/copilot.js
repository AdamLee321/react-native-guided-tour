"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copilot = copilot;
var _CopilotProvider = require("../contexts/CopilotProvider.js");
var _jsxRuntime = require("react/jsx-runtime");
const ComponentWithCopilotContext = WrappedComponent => {
  const Component = props => {
    const copilot = (0, _CopilotProvider.useCopilot)();
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
      ...props,
      ...copilot
    });
  };
  Component.displayName = `CopilotInjector(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;
  return Component;
};

/**
 * @deprecated The HOC is deprecated. Please use `CopilotProvider` instead.
 */
function copilot(options) {
  return WrappedComponent => {
    const OuterComponent = props => {
      const InnerComponentWithCopilotContext = ComponentWithCopilotContext(WrappedComponent);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CopilotProvider.CopilotProvider, {
        ...options,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(InnerComponentWithCopilotContext, {
          ...props
        })
      });
    };
    OuterComponent.displayName = `copilot(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;
    return OuterComponent;
  };
}
//# sourceMappingURL=copilot.js.map