"use strict";

import mitt from 'mitt';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { findNodeHandle } from 'react-native';
import { CopilotModal } from "../components/CopilotModal.js";
import { OFFSET_WIDTH } from "../components/style.js";
import { useStateWithAwait } from "../hooks/useStateWithAwait.js";
import { useStepsMap } from "../hooks/useStepsMap.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/*
This is the maximum wait time for the steps to be registered before starting the tutorial
At 60fps means 2 seconds
*/
const MAX_START_TRIES = 120;
const CopilotContext = /*#__PURE__*/createContext(undefined);
export const CopilotProvider = ({
  verticalOffset = 0,
  children,
  ...rest
}) => {
  const startTries = useRef(0);
  const copilotEvents = useRef(mitt()).current;
  const modal = useRef(null);
  const [visible, setVisibility] = useStateWithAwait(false);
  const [scrollView, setScrollView] = useState(null);
  const {
    currentStep,
    currentStepNumber,
    totalStepsNumber,
    getFirstStep,
    getPrevStep,
    getNextStep,
    getNthStep,
    isFirstStep,
    isLastStep,
    setCurrentStepState,
    steps,
    registerStep,
    unregisterStep
  } = useStepsMap();
  const moveModalToStep = useCallback(async step => {
    const size = await step?.measure();
    if (!size) {
      return;
    }
    await modal.current?.animateMove({
      width: size.width + OFFSET_WIDTH,
      height: size.height + OFFSET_WIDTH,
      x: size.x - OFFSET_WIDTH / 2,
      y: size.y - OFFSET_WIDTH / 2 + verticalOffset
    });
  }, [verticalOffset]);
  const setCurrentStep = useCallback(async (step, move = true) => {
    setCurrentStepState(step);
    copilotEvents.emit('stepChange', step);
    if (scrollView != null) {
      const nodeHandle = findNodeHandle(scrollView);
      if (nodeHandle) {
        step?.wrapperRef.current?.measureLayout(nodeHandle, (_x, y, _w, h) => {
          const yOffset = y > 0 ? y - h / 2 : 0;
          scrollView.scrollTo({
            y: yOffset,
            animated: false
          });
        });
      }
    }
    setTimeout(() => {
      if (move && step) {
        void moveModalToStep(step);
      }
    }, scrollView != null ? 100 : 0);
  }, [copilotEvents, moveModalToStep, scrollView, setCurrentStepState]);
  const start = useCallback(async (fromStep, suppliedScrollView = null) => {
    if (scrollView == null) {
      setScrollView(suppliedScrollView);
    }
    const currentStep = fromStep ? steps[fromStep] : getFirstStep();
    if (startTries.current > MAX_START_TRIES) {
      startTries.current = 0;
      return;
    }
    if (currentStep == null) {
      startTries.current += 1;
      requestAnimationFrame(() => {
        void start(fromStep);
      });
    } else {
      copilotEvents.emit('start');
      await setCurrentStep(currentStep);
      await moveModalToStep(currentStep);
      await setVisibility(true);
      startTries.current = 0;
    }
  }, [copilotEvents, getFirstStep, moveModalToStep, scrollView, setCurrentStep, setVisibility, steps]);
  const stop = useCallback(async () => {
    await setVisibility(false);
    copilotEvents.emit('stop');
  }, [copilotEvents, setVisibility]);
  const next = useCallback(async () => {
    await setCurrentStep(getNextStep());
  }, [getNextStep, setCurrentStep]);
  const nth = useCallback(async n => {
    await setCurrentStep(getNthStep(n));
  }, [getNthStep, setCurrentStep]);
  const prev = useCallback(async () => {
    await setCurrentStep(getPrevStep());
  }, [getPrevStep, setCurrentStep]);
  const value = useMemo(() => ({
    registerStep,
    unregisterStep,
    currentStep,
    start,
    stop,
    visible,
    copilotEvents,
    goToNext: next,
    goToNth: nth,
    goToPrev: prev,
    isFirstStep,
    isLastStep,
    currentStepNumber,
    totalStepsNumber
  }), [registerStep, unregisterStep, currentStep, start, stop, visible, copilotEvents, next, nth, prev, isFirstStep, isLastStep, currentStepNumber, totalStepsNumber]);
  return /*#__PURE__*/_jsx(CopilotContext.Provider, {
    value: value,
    children: /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(CopilotModal, {
        ref: modal,
        ...rest
      }), children]
    })
  });
};
export const useCopilot = () => {
  const value = useContext(CopilotContext);
  if (value == null) {
    throw new Error('You must wrap your app inside CopilotProvider');
  }
  return value;
};
//# sourceMappingURL=CopilotProvider.js.map