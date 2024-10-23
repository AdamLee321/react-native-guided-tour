"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCopilot = exports.CopilotProvider = void 0;
var _mitt = _interopRequireDefault(require("mitt"));
var _react = require("react");
var _reactNative = require("react-native");
var _CopilotModal = require("../components/CopilotModal.js");
var _style = require("../components/style.js");
var _useStateWithAwait = require("../hooks/useStateWithAwait.js");
var _useStepsMap = require("../hooks/useStepsMap.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/*
This is the maximum wait time for the steps to be registered before starting the tutorial
At 60fps means 2 seconds
*/
const MAX_START_TRIES = 120;
const CopilotContext = /*#__PURE__*/(0, _react.createContext)(undefined);
const CopilotProvider = ({
  verticalOffset = 0,
  children,
  ...rest
}) => {
  const startTries = (0, _react.useRef)(0);
  const copilotEvents = (0, _react.useRef)((0, _mitt.default)()).current;
  const modal = (0, _react.useRef)(null);
  const [visible, setVisibility] = (0, _useStateWithAwait.useStateWithAwait)(false);
  const [scrollView, setScrollView] = (0, _react.useState)(null);
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
  } = (0, _useStepsMap.useStepsMap)();
  const moveModalToStep = (0, _react.useCallback)(async step => {
    const size = await step?.measure();
    if (!size) {
      return;
    }
    await modal.current?.animateMove({
      width: size.width + _style.OFFSET_WIDTH,
      height: size.height + _style.OFFSET_WIDTH,
      x: size.x - _style.OFFSET_WIDTH / 2,
      y: size.y - _style.OFFSET_WIDTH / 2 + verticalOffset
    });
  }, [verticalOffset]);
  const setCurrentStep = (0, _react.useCallback)(async (step, move = true) => {
    setCurrentStepState(step);
    copilotEvents.emit('stepChange', step);
    if (scrollView != null) {
      const nodeHandle = (0, _reactNative.findNodeHandle)(scrollView);
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
  const start = (0, _react.useCallback)(async (fromStep, suppliedScrollView = null) => {
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
  const stop = (0, _react.useCallback)(async () => {
    await setVisibility(false);
    copilotEvents.emit('stop');
  }, [copilotEvents, setVisibility]);
  const next = (0, _react.useCallback)(async () => {
    await setCurrentStep(getNextStep());
  }, [getNextStep, setCurrentStep]);
  const nth = (0, _react.useCallback)(async n => {
    await setCurrentStep(getNthStep(n));
  }, [getNthStep, setCurrentStep]);
  const prev = (0, _react.useCallback)(async () => {
    await setCurrentStep(getPrevStep());
  }, [getPrevStep, setCurrentStep]);
  const value = (0, _react.useMemo)(() => ({
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(CopilotContext.Provider, {
    value: value,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CopilotModal.CopilotModal, {
        ref: modal,
        ...rest
      }), children]
    })
  });
};
exports.CopilotProvider = CopilotProvider;
const useCopilot = () => {
  const value = (0, _react.useContext)(CopilotContext);
  if (value == null) {
    throw new Error('You must wrap your app inside CopilotProvider');
  }
  return value;
};
exports.useCopilot = useCopilot;
//# sourceMappingURL=CopilotProvider.js.map