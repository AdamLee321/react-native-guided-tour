"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewMask = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _style = require("./style.js");
var _jsxRuntime = require("react/jsx-runtime");
const ViewMask = props => {
  const sizeValue = (0, _react.useRef)(new _reactNative.Animated.ValueXY(props.size)).current;
  const positionValue = (0, _react.useRef)(new _reactNative.Animated.ValueXY(props.position)).current;
  const [animated, setAnimated] = (0, _react.useState)(false);
  const animate = (0, _react.useCallback)((size = props.size, position = props.position) => {
    if (animated) {
      _reactNative.Animated.parallel([_reactNative.Animated.timing(sizeValue, {
        toValue: size,
        duration: props.animationDuration,
        easing: props.easing,
        useNativeDriver: false
      }), _reactNative.Animated.timing(positionValue, {
        toValue: position,
        duration: props.animationDuration,
        easing: props.easing,
        useNativeDriver: false
      })]).start();
    } else {
      sizeValue.setValue(size);
      positionValue.setValue(position);
      setAnimated(props.animated);
    }
  }, [animated, positionValue, props.animated, props.animationDuration, props.easing, props.position, props.size, sizeValue]);
  (0, _react.useEffect)(() => {
    if (props.position || props.size) {
      animate(props.size, props.position);
    }
  }, [animate, props.position, props.size]);
  const width = props.layout ? props.layout.width : 500;
  const height = props.layout ? props.layout.height : 500;
  const leftOverlayRight = _reactNative.Animated.add(width, _reactNative.Animated.multiply(positionValue.x, -1));
  const rightOverlayLeft = _reactNative.Animated.add(sizeValue.x, positionValue.x);
  const bottomOverlayTopBoundary = _reactNative.Animated.add(sizeValue.y, positionValue.y);
  const topOverlayBottomBoundary = _reactNative.Animated.add(height, _reactNative.Animated.multiply(-1, positionValue.y));
  const verticalOverlayLeftBoundary = positionValue.x;
  const verticalOverlayRightBoundary = _reactNative.Animated.add(width, _reactNative.Animated.multiply(-1, rightOverlayLeft));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: props.style,
    onStartShouldSetResponder: props.onClick,
    children: [{
      right: leftOverlayRight,
      backgroundColor: props.backdropColor
    }, {
      left: rightOverlayLeft,
      backgroundColor: props.backdropColor
    }, {
      top: bottomOverlayTopBoundary,
      left: verticalOverlayLeftBoundary,
      right: verticalOverlayRightBoundary,
      backgroundColor: props.backdropColor
    }, {
      bottom: topOverlayBottomBoundary,
      left: verticalOverlayLeftBoundary,
      right: verticalOverlayRightBoundary,
      backgroundColor: props.backdropColor
    }].map((style, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      style: [_style.styles.overlayRectangle, style]
    }, index))
  });
};
exports.ViewMask = ViewMask;
//# sourceMappingURL=ViewMask.js.map