"use strict";

import React, { useEffect, useMemo, useRef } from 'react';
import { useTourGuide } from "../contexts/TourGuideProvider.js";
export const TourGuideStep = ({
  name,
  order,
  text,
  children,
  active = true
}) => {
  const registeredName = useRef(null);
  const {
    registerStep,
    unregisterStep
  } = useTourGuide();
  const wrapperRef = React.useRef(null);
  const measure = async () => {
    return await new Promise(resolve => {
      const measure = () => {
        // Wait until the wrapper element appears
        if (wrapperRef.current != null && 'measure' in wrapperRef.current) {
          wrapperRef.current.measure((_ox, _oy, width, height, x, y) => {
            resolve({
              x,
              y,
              width,
              height
            });
          });
        } else {
          requestAnimationFrame(measure);
        }
      };
      measure();
    });
  };
  useEffect(() => {
    if (active) {
      if (registeredName.current && registeredName.current !== name) {
        unregisterStep(registeredName.current);
      }
      registerStep({
        name,
        text,
        order,
        measure,
        wrapperRef,
        visible: true
      });
      registeredName.current = name;
    }
  }, [name, order, text, registerStep, unregisterStep, active]);
  useEffect(() => {
    if (active) {
      return () => {
        if (registeredName.current) {
          unregisterStep(registeredName.current);
        }
      };
    }
    return undefined;
  }, [name, unregisterStep, active]);
  const TourGuideProps = useMemo(() => ({
    ref: wrapperRef,
    onLayout: () => {} // Android hack
  }), []);
  return /*#__PURE__*/React.cloneElement(children, {
    TourGuide: TourGuideProps
  });
};
//# sourceMappingURL=TourGuideStep.js.map