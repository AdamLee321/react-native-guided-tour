"use strict";

import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { jsx as _jsx } from "react/jsx-runtime";
const AnimatedSvgPath = Animated.createAnimatedComponent(Path);
const windowDimensions = Dimensions.get('window');
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
export const SvgMask = ({
  size,
  position,
  style,
  easing = Easing.linear,
  animationDuration = 300,
  animated,
  backdropColor,
  svgMaskPath = defaultSvgPath,
  onClick,
  currentStep
}) => {
  const [canvasSize, setCanvasSize] = useState({
    x: windowDimensions.width,
    y: windowDimensions.height
  });
  const sizeValue = useRef(new Animated.ValueXY(size)).current;
  const positionValue = useRef(new Animated.ValueXY(position)).current;
  const maskRef = useRef(null);
  const animationListener = useCallback(() => {
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
  const animate = useCallback((toSize = size, toPosition = position) => {
    if (animated) {
      Animated.parallel([Animated.timing(sizeValue, {
        toValue: toSize,
        duration: animationDuration,
        easing,
        useNativeDriver: false
      }), Animated.timing(positionValue, {
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
  useEffect(() => {
    const id = positionValue.addListener(animationListener);
    return () => {
      positionValue.removeListener(id);
    };
  }, [animationListener, positionValue]);
  useEffect(() => {
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
  return /*#__PURE__*/_jsx(View, {
    style: style,
    onLayout: handleLayout,
    onStartShouldSetResponder: onClick,
    children: canvasSize ? /*#__PURE__*/_jsx(Svg, {
      pointerEvents: "none",
      width: canvasSize.x,
      height: canvasSize.y,
      children: /*#__PURE__*/_jsx(AnimatedSvgPath, {
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
//# sourceMappingURL=SvgMask.js.map