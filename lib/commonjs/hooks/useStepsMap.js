"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStepsMap = void 0;
var _react = require("react");
const useStepsMap = () => {
  const [currentStep, setCurrentStepState] = (0, _react.useState)(undefined);
  const [steps, dispatch] = (0, _react.useReducer)((state, action) => {
    switch (action.type) {
      case 'register':
        return {
          ...state,
          [action.step.name]: action.step
        };
      case 'unregister':
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const {
            [action.stepName]: _,
            ...rest
          } = state;
          return rest;
        }
      default:
        return state;
    }
  }, {});
  const orderedSteps = (0, _react.useMemo)(() => Object.values(steps).sort((a, b) => a.order - b.order), [steps]);
  const stepIndex = (0, _react.useCallback)((step = currentStep) => step ? orderedSteps.findIndex(stepCandidate => stepCandidate.order === step.order) : -1, [currentStep, orderedSteps]);
  const currentStepNumber = (0, _react.useMemo)((step = currentStep) => stepIndex(step) + 1, [currentStep, stepIndex]);
  const totalStepsNumber = (0, _react.useMemo)(() => orderedSteps.length, [orderedSteps]);
  const getFirstStep = (0, _react.useCallback)(() => orderedSteps[0], [orderedSteps]);
  const getLastStep = (0, _react.useCallback)(() => orderedSteps[orderedSteps.length - 1], [orderedSteps]);
  const getPrevStep = (0, _react.useCallback)((step = currentStep) => step && orderedSteps[stepIndex(step) - 1], [currentStep, stepIndex, orderedSteps]);
  const getNextStep = (0, _react.useCallback)((step = currentStep) => step && orderedSteps[stepIndex(step) + 1], [currentStep, stepIndex, orderedSteps]);
  const getNthStep = (0, _react.useCallback)(n => orderedSteps[n - 1], [orderedSteps]);
  const isFirstStep = (0, _react.useMemo)(() => currentStep === getFirstStep(), [currentStep, getFirstStep]);
  const isLastStep = (0, _react.useMemo)(() => currentStep === getLastStep(), [currentStep, getLastStep]);
  const registerStep = (0, _react.useCallback)(step => {
    dispatch({
      type: 'register',
      step
    });
  }, []);
  const unregisterStep = (0, _react.useCallback)(stepName => {
    dispatch({
      type: 'unregister',
      stepName
    });
  }, []);
  return {
    currentStepNumber,
    totalStepsNumber,
    getFirstStep,
    getLastStep,
    getPrevStep,
    getNextStep,
    getNthStep,
    isFirstStep,
    isLastStep,
    currentStep,
    setCurrentStepState,
    steps,
    registerStep,
    unregisterStep
  };
};
exports.useStepsMap = useStepsMap;
//# sourceMappingURL=useStepsMap.js.map