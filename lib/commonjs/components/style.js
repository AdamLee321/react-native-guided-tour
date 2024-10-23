"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = exports.ZINDEX = exports.STEP_NUMBER_RADIUS = exports.STEP_NUMBER_DIAMETER = exports.OFFSET_WIDTH = exports.MARGIN = exports.ARROW_SIZE = void 0;
var _reactNative = require("react-native");
const STEP_NUMBER_RADIUS = exports.STEP_NUMBER_RADIUS = 14;
const STEP_NUMBER_DIAMETER = exports.STEP_NUMBER_DIAMETER = STEP_NUMBER_RADIUS * 2;
const ZINDEX = exports.ZINDEX = 100;
const MARGIN = exports.MARGIN = 13;
const OFFSET_WIDTH = exports.OFFSET_WIDTH = 4;
const ARROW_SIZE = exports.ARROW_SIZE = 6;
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: ZINDEX
  },
  arrow: {
    position: 'absolute',
    borderColor: 'transparent',
    borderWidth: ARROW_SIZE
  },
  tooltip: {
    position: 'absolute',
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden'
  },
  tooltipText: {},
  tooltipContainer: {
    flex: 1
  },
  stepNumberContainer: {
    position: 'absolute',
    width: STEP_NUMBER_DIAMETER,
    height: STEP_NUMBER_DIAMETER,
    overflow: 'hidden',
    zIndex: ZINDEX + 1
  },
  stepNumber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: STEP_NUMBER_RADIUS,
    borderColor: '#FFFFFF'
  },
  stepNumberText: {
    fontSize: 10,
    backgroundColor: 'transparent',
    color: '#FFFFFF'
  },
  button: {
    padding: 10
  },
  buttonText: {},
  bottomBar: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  overlayRectangle: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  },
  overlayContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  }
});
//# sourceMappingURL=style.js.map