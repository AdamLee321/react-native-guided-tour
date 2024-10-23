"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SvgMask = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AnimatedSvgPath = _reactNative.Animated.createAnimatedComponent(_reactNativeSvg.Path);
const windowDimensions = _reactNative.Dimensions.get('window');
const defaultSvgPath = ({
  size,
  position,
  canvasSize
}) => {
  const positionX = position.x._value;
  const positionY = position.y._value;
  const sizeX = size.x._value;
  const sizeY = size.y._value;
  return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${positionX},${positionY}H${positionX + sizeX}V${positionY + sizeY}H${positionX}V${positionY}Z`;
};
const SvgMask = ({
  size,
  position,
  style,
  easing = _reactNative.Easing.linear,
  animationDuration = 300,
  animated,
  backdropColor,
  svgMaskPath = defaultSvgPath,
  onClick,
  currentStep
}) => {
  const [canvasSize, setCanvasSize] = (0, _react.useState)({
    x: windowDimensions.width,
    y: windowDimensions.height
  });
  const sizeValue = (0, _react.useRef)(new _reactNative.Animated.ValueXY(size)).current;
  const positionValue = (0, _react.useRef)(new _reactNative.Animated.ValueXY(position)).current;
  const maskRef = (0, _react.useRef)(null);
  const animationListener = (0, _react.useCallback)(() => {
    const d = svgMaskPath({
      size: sizeValue,
      position: positionValue,
      canvasSize,
      step: currentStep
    });
    if (maskRef.current) {
      maskRef.current.setNativeProps({
        d
      });
    }
  }, [canvasSize, currentStep, svgMaskPath, positionValue, sizeValue]);
  const animate = (0, _react.useCallback)((toSize = size, toPosition = position) => {
    if (animated) {
      _reactNative.Animated.parallel([_reactNative.Animated.timing(sizeValue, {
        toValue: toSize,
        duration: animationDuration,
        easing,
        useNativeDriver: false
      }), _reactNative.Animated.timing(positionValue, {
        toValue: toPosition,
        duration: animationDuration,
        easing,
        useNativeDriver: false
      })]).start();
    } else {
      sizeValue.setValue(toSize);
      positionValue.setValue(toPosition);
    }
  }, [animated, animationDuration, easing, positionValue, position, size, sizeValue]);
  (0, _react.useEffect)(() => {
    const id = positionValue.addListener(animationListener);
    return () => {
      positionValue.removeListener(id);
    };
  }, [animationListener, positionValue]);
  (0, _react.useEffect)(() => {
    if (size && position) {
      animate(size, position);
    }
  }, [animate, position, size]);
  const handleLayout = ({
    nativeEvent: {
      layout: {
        width,
        height
      }
    }
  }) => {
    setCanvasSize({
      x: width,
      y: height
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: style,
    onLayout: handleLayout,
    onStartShouldSetResponder: onClick,
    children: canvasSize ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.default, {
      pointerEvents: "none",
      width: canvasSize.x,
      height: canvasSize.y,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(AnimatedSvgPath, {
        ref: maskRef,
        fill: backdropColor,
        fillRule: "evenodd",
        strokeWidth: 1,
        d: svgMaskPath({
          size: sizeValue,
          position: positionValue,
          canvasSize,
          step: currentStep
        })
      })
    }) : null
  });
};
exports.SvgMask = SvgMask;
//# sourceMappingURL=SvgMask.js.map