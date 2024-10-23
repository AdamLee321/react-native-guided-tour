"use strict";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Animated, Easing, Modal, NativeModules, Platform, StatusBar, View } from 'react-native';
import { useTourGuide } from "../contexts/TourGuideProvider.js";
import { StepNumber } from "./default-ui/StepNumber.js";
import { Tooltip } from "./default-ui/Tooltip.js";
import { ARROW_SIZE, MARGIN, STEP_NUMBER_DIAMETER, STEP_NUMBER_RADIUS, styles } from "./style.js";
import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
const noop = () => {};
const makeDefaultLayout = () => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0
});
export const TourGuideModal = /*#__PURE__*/forwardRef(function TourGuideModal({
  easing = Easing.elastic(0.7),
  animationDuration = 400,
  tooltipComponent: TooltipComponent = Tooltip,
  tooltipStyle = {},
  tooltipTextStyle = {},
  stepNumberComponent: StepNumberComponent = StepNumber,
  overlay = typeof NativeModules.RNSVGSvgViewManager !== 'undefined' ? 'svg' : 'view',
  animated = typeof NativeModules.RNSVGSvgViewManager !== 'undefined',
  androidStatusBarVisible = false,
  backdropColor = 'rgba(0, 0, 0, 0.4)',
  stepStyle = {},
  stepTextStyle = {},
  labels = {
    finish: 'Finish',
    next: 'Next',
    previous: 'Previous',
    skip: 'Skip'
  },
  buttonStyle = {},
  buttonTextStyle = {},
  svgMaskPath,
  stopOnOutsideClick = false,
  arrowColor = '#fff',
  arrowSize = ARROW_SIZE,
  margin = MARGIN
}, ref) {
  const {
    stop,
    currentStep,
    visible
  } = useTourGuide();
  const [tooltipStyles, setTooltipStyles] = useState({});
  const [arrowStyles, setArrowStyles] = useState({});
  const [animatedValues] = useState({
    top: new Animated.Value(0),
    stepNumberLeft: new Animated.Value(0)
  });
  const layoutRef = useRef(makeDefaultLayout());
  const [layout, setLayout] = useState(undefined);
  const [maskRect, setMaskRect] = useState();
  const [isAnimated, setIsAnimated] = useState(false);
  const [containerVisible, setContainerVisible] = useState(false);
  useEffect(() => {
    if (visible) {
      setContainerVisible(true);
    }
  }, [visible]);
  useEffect(() => {
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
  const _animateMove = useCallback(async rect => {
    const newMeasuredLayout = await measure();
    if (!androidStatusBarVisible && Platform.OS === 'android') {
      rect.y -= StatusBar.currentHeight ?? 0;
    }
    let stepNumberLeft = rect.x - STEP_NUMBER_RADIUS;
    if (stepNumberLeft < 0) {
      stepNumberLeft = rect.x + rect.width - STEP_NUMBER_RADIUS;
      if (stepNumberLeft > newMeasuredLayout.width - STEP_NUMBER_DIAMETER) {
        stepNumberLeft = newMeasuredLayout.width - STEP_NUMBER_DIAMETER;
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
      Animated.parallel(animate.map(([key, value]) => {
        return Animated.timing(animatedValues[key], {
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
  const animateMove = useCallback(async rect => {
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
  useImperativeHandle(ref, () => {
    return {
      animateMove
    };
  }, [animateMove]);
  const modalVisible = containerVisible || visible;
  const contentVisible = layout != null && containerVisible;
  if (!modalVisible) {
    return null;
  }
  return /*#__PURE__*/_jsx(Modal, {
    animationType: "none",
    visible: true,
    onRequestClose: noop,
    transparent: true,
    supportedOrientations: ['portrait', 'landscape'],
    children: /*#__PURE__*/_jsxs(View, {
      style: styles.container,
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
    return /*#__PURE__*/_jsx(MaskComponent, {
      animated: animated,
      layout: layout,
      style: styles.overlayContainer,
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
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Animated.View, {
        style: [styles.stepNumberContainer, {
          left: animatedValues.stepNumberLeft,
          top: Animated.add(animatedValues.top, -STEP_NUMBER_RADIUS)
        }],
        children: /*#__PURE__*/_jsx(StepNumberComponent, {
          style: stepStyle,
          textStyle: stepTextStyle
        })
      }, "stepNumber"), !!arrowSize && /*#__PURE__*/_jsx(Animated.View, {
        style: [styles.arrow, arrowStyles]
      }, "arrow"), /*#__PURE__*/_jsx(Animated.View, {
        style: [styles.tooltip, tooltipStyles, tooltipStyle],
        children: /*#__PURE__*/_jsx(TooltipComponent, {
          labels: labels,
          tooltipTextStyle: tooltipTextStyle,
          buttonStyle: buttonStyle,
          buttonTextStyle: buttonTextStyle
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