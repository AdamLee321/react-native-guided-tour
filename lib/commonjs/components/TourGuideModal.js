"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TourGuideModal = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _TourGuideProvider = require("../contexts/TourGuideProvider.js");
var _StepNumber = require("./default-ui/StepNumber.js");
var _Tooltip = require("./default-ui/Tooltip.js");
var _style = require("./style.js");
var _jsxRuntime = require("react/jsx-runtime");
const noop = () => {};
const makeDefaultLayout = () => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0
});
const TourGuideModal = exports.TourGuideModal = /*#__PURE__*/(0, _react.forwardRef)(function TourGuideModal({
  easing = _reactNative.Easing.elastic(0.7),
  animationDuration = 400,
  tooltipComponent: TooltipComponent = _Tooltip.Tooltip,
  tooltipStyle = {},
  stepNumberComponent: StepNumberComponent = _StepNumber.StepNumber,
  overlay = typeof _reactNative.NativeModules.RNSVGSvgViewManager !== 'undefined' ? 'svg' : 'view',
  animated = typeof _reactNative.NativeModules.RNSVGSvgViewManager !== 'undefined',
  androidStatusBarVisible = false,
  backdropColor = 'rgba(0, 0, 0, 0.4)',
  labels = {
    finish: 'Finish',
    next: 'Next',
    previous: 'Previous',
    skip: 'Skip'
  },
  svgMaskPath,
  stopOnOutsideClick = false,
  arrowColor = '#fff',
  arrowSize = _style.ARROW_SIZE,
  margin = _style.MARGIN
}, ref) {
  const {
    stop,
    currentStep,
    visible
  } = (0, _TourGuideProvider.useTourGuide)();
  const [tooltipStyles, setTooltipStyles] = (0, _react.useState)({});
  const [arrowStyles, setArrowStyles] = (0, _react.useState)({});
  const [animatedValues] = (0, _react.useState)({
    top: new _reactNative.Animated.Value(0),
    stepNumberLeft: new _reactNative.Animated.Value(0)
  });
  const layoutRef = (0, _react.useRef)(makeDefaultLayout());
  const [layout, setLayout] = (0, _react.useState)(undefined);
  const [maskRect, setMaskRect] = (0, _react.useState)();
  const [isAnimated, setIsAnimated] = (0, _react.useState)(false);
  const [containerVisible, setContainerVisible] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (visible) {
      setContainerVisible(true);
    }
  }, [visible]);
  (0, _react.useEffect)(() => {
    if (!visible) {
      reset();
    }
  }, [visible]);
  const handleLayoutChange = ({
    nativeEvent: {
      layout: newLayout
    }
  }) => {
    layoutRef.current = newLayout;
  };
  const measure = async () => {
    return await new Promise(resolve => {
      const updateLayout = () => {
        if (layoutRef.current.width !== 0) {
          resolve(layoutRef.current);
        } else {
          requestAnimationFrame(updateLayout);
        }
      };
      updateLayout();
    });
  };
  const _animateMove = (0, _react.useCallback)(async rect => {
    const newMeasuredLayout = await measure();
    if (!androidStatusBarVisible && _reactNative.Platform.OS === 'android') {
      rect.y -= _reactNative.StatusBar.currentHeight ?? 0;
    }
    let stepNumberLeft = rect.x - _style.STEP_NUMBER_RADIUS;
    if (stepNumberLeft < 0) {
      stepNumberLeft = rect.x + rect.width - _style.STEP_NUMBER_RADIUS;
      if (stepNumberLeft > newMeasuredLayout.width - _style.STEP_NUMBER_DIAMETER) {
        stepNumberLeft = newMeasuredLayout.width - _style.STEP_NUMBER_DIAMETER;
      }
    }
    const center = {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2
    };
    const relativeToLeft = center.x;
    const relativeToTop = center.y;
    const relativeToBottom = Math.abs(center.y - newMeasuredLayout.height);
    const relativeToRight = Math.abs(center.x - newMeasuredLayout.width);
    const verticalPosition = relativeToBottom > relativeToTop ? 'bottom' : 'top';
    const horizontalPosition = relativeToLeft > relativeToRight ? 'left' : 'right';
    const tooltip = {};
    const arrow = {};
    if (verticalPosition === 'bottom') {
      tooltip.top = rect.y + rect.height + margin;
      arrow.borderBottomColor = arrowColor;
      arrow.top = tooltip.top - arrowSize * 2;
    } else {
      tooltip.bottom = newMeasuredLayout.height - (rect.y - margin);
      arrow.borderTopColor = arrowColor;
      arrow.bottom = tooltip.bottom - arrowSize * 2;
    }
    if (horizontalPosition === 'left') {
      tooltip.right = Math.max(newMeasuredLayout.width - (rect.x + rect.width), 0);
      tooltip.right = tooltip.right === 0 ? tooltip.right + margin : tooltip.right;
      tooltip.maxWidth = newMeasuredLayout.width - tooltip.right - margin;
      arrow.right = tooltip.right + margin;
    } else {
      tooltip.left = Math.max(rect.x, 0);
      tooltip.left = tooltip.left === 0 ? tooltip.left + margin : tooltip.left;
      tooltip.maxWidth = newMeasuredLayout.width - tooltip.left - margin;
      arrow.left = tooltip.left + margin;
    }
    sanitize(arrow);
    sanitize(tooltip);
    sanitize(rect);
    const animate = [['top', rect.y], ['stepNumberLeft', stepNumberLeft]];
    if (isAnimated) {
      _reactNative.Animated.parallel(animate.map(([key, value]) => {
        return _reactNative.Animated.timing(animatedValues[key], {
          toValue: value,
          duration: animationDuration,
          easing,
          useNativeDriver: false
        });
      })).start();
    } else {
      animate.forEach(([key, value]) => {
        animatedValues[key].setValue(value);
      });
    }
    setTooltipStyles(tooltip);
    setArrowStyles(arrow);
    setLayout(newMeasuredLayout);
    setMaskRect({
      width: rect.width,
      height: rect.height,
      x: Math.floor(Math.max(rect.x, 0)),
      y: Math.floor(Math.max(rect.y, 0))
    });
  }, [androidStatusBarVisible, animatedValues, animationDuration, arrowColor, easing, isAnimated, arrowSize, margin]);
  const animateMove = (0, _react.useCallback)(async rect => {
    await new Promise(resolve => {
      const frame = async () => {
        await _animateMove(rect);
        resolve();
      };
      setContainerVisible(true);
      requestAnimationFrame(() => {
        void frame();
      });
    });
  }, [_animateMove]);
  const reset = () => {
    setIsAnimated(false);
    setContainerVisible(false);
    setLayout(undefined);
  };
  const handleStop = () => {
    reset();
    void stop();
  };
  const handleMaskClick = () => {
    if (stopOnOutsideClick) {
      handleStop();
    }
  };
  (0, _react.useImperativeHandle)(ref, () => {
    return {
      animateMove
    };
  }, [animateMove]);
  const modalVisible = containerVisible || visible;
  const contentVisible = layout != null && containerVisible;
  if (!modalVisible) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
    animationType: "none",
    visible: true,
    onRequestClose: noop,
    transparent: true,
    supportedOrientations: ['portrait', 'landscape'],
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _style.styles.container,
      onLayout: handleLayoutChange,
      children: [contentVisible && renderMask(), contentVisible && renderTooltip()]
    })
  });
  function renderMask() {
    const MaskComponent = overlay === 'svg' ? require('./SvgMask').SvgMask : require('./ViewMask').ViewMask;
    const size = maskRect && {
      x: maskRect.width,
      y: maskRect.height
    };
    const position = maskRect;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(MaskComponent, {
      animated: animated,
      layout: layout,
      style: _style.styles.overlayContainer,
      size: size,
      position: position,
      easing: easing,
      animationDuration: animationDuration,
      backdropColor: backdropColor,
      svgMaskPath: svgMaskPath,
      onClick: handleMaskClick,
      currentStep: currentStep
    });
  }
  function renderTooltip() {
    if (!currentStep) {
      return null;
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
        style: [_style.styles.stepNumberContainer, {
          left: animatedValues.stepNumberLeft,
          top: _reactNative.Animated.add(animatedValues.top, -_style.STEP_NUMBER_RADIUS)
        }],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(StepNumberComponent, {})
      }, "stepNumber"), !!arrowSize && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
        style: [_style.styles.arrow, arrowStyles]
      }, "arrow"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
        style: [_style.styles.tooltip, tooltipStyles, tooltipStyle],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(TooltipComponent, {
          labels: labels
        })
      }, "tooltip")]
    });
  }
});
const floorify = obj => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'number') {
      obj[key] = Math.floor(obj[key]);
    }
  });
};
const removeNan = obj => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'number' && isNaN(obj[key])) {
      delete obj[key];
    }
  });
};
const sanitize = obj => {
  floorify(obj);
  removeNan(obj);
};
//# sourceMappingURL=TourGuideModal.js.map