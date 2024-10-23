"use strict";

import { CopilotProvider, useCopilot } from "../contexts/CopilotProvider.js";
import { jsx as _jsx } from "react/jsx-runtime";
const ComponentWithCopilotContext = WrappedComponent => {
  const Component = props => {
    const copilot = useCopilot();
    return /*#__PURE__*/_jsx(WrappedComponent, {
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
export function copilot(options) {
  return WrappedComponent => {
    const OuterComponent = props => {
      const InnerComponentWithCopilotContext = ComponentWithCopilotContext(WrappedComponent);
      return /*#__PURE__*/_jsx(CopilotProvider, {
        ...options,
        children: /*#__PURE__*/_jsx(InnerComponentWithCopilotContext, {
          ...props
        })
      });
    };
    OuterComponent.displayName = `copilot(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;
    return OuterComponent;
  };
}
//# sourceMappingURL=copilot.js.map