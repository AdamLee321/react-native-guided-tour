"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultUI = void 0;
Object.defineProperty(exports, "TourGuideProvider", {
  enumerable: true,
  get: function () {
    return _TourGuideProvider.TourGuideProvider;
  }
});
Object.defineProperty(exports, "TourGuideStep", {
  enumerable: true,
  get: function () {
    return _TourGuideStep.TourGuideStep;
  }
});
Object.defineProperty(exports, "useTourGuide", {
  enumerable: true,
  get: function () {
    return _TourGuideProvider.useTourGuide;
  }
});
Object.defineProperty(exports, "walkthroughable", {
  enumerable: true,
  get: function () {
    return _walkthroughable.walkthroughable;
  }
});
var _StepNumber = _interopRequireDefault(require("./components/default-ui/StepNumber.js"));
var _Tooltip = _interopRequireDefault(require("./components/default-ui/Tooltip.js"));
var _walkthroughable = require("./hocs/walkthroughable.js");
var _TourGuideStep = require("./components/TourGuideStep.js");
var _TourGuideProvider = require("./contexts/TourGuideProvider.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DefaultUI = exports.DefaultUI = {
  StepNumber: _StepNumber.default,
  Tooltip: _Tooltip.default
};
//# sourceMappingURL=index.js.map