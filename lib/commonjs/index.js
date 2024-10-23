"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CopilotProvider", {
  enumerable: true,
  get: function () {
    return _CopilotProvider.CopilotProvider;
  }
});
Object.defineProperty(exports, "CopilotStep", {
  enumerable: true,
  get: function () {
    return _CopilotStep.CopilotStep;
  }
});
exports.DefaultUI = void 0;
Object.defineProperty(exports, "useCopilot", {
  enumerable: true,
  get: function () {
    return _CopilotProvider.useCopilot;
  }
});
Object.defineProperty(exports, "walkthroughable", {
  enumerable: true,
  get: function () {
    return _walkthroughable.walkthroughable;
  }
});
var _StepNumber = require("./components/default-ui/StepNumber.js");
var _Tooltip = require("./components/default-ui/Tooltip.js");
var _walkthroughable = require("./hocs/walkthroughable.js");
var _CopilotStep = require("./components/CopilotStep.js");
var _CopilotProvider = require("./contexts/CopilotProvider.js");
const DefaultUI = exports.DefaultUI = {
  StepNumber: _StepNumber.StepNumber,
  Tooltip: _Tooltip.Tooltip
};
//# sourceMappingURL=index.js.map