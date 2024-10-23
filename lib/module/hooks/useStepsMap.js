"use strict";

import { useCallback, useMemo, useReducer, useState } from 'react';
export const useStepsMap = () => {
  const [currentStep, setCurrentStepState] = useState(undefined);
  const [steps, dispatch] = useReducer((state, action) => {
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
  const orderedSteps = useMemo(() => Object.values(steps).sort((a, b) => a.order - b.order), [steps]);
  const stepIndex = useCallback((step = currentStep) => step ? orderedSteps.findIndex(stepCandidate => stepCandidate.order === step.order) : -1, [currentStep, orderedSteps]);
  const currentStepNumber = useMemo((step = currentStep) => stepIndex(step) + 1, [currentStep, stepIndex]);
  const totalStepsNumber = useMemo(() => orderedSteps.length, [orderedSteps]);
  const getFirstStep = useCallback(() => orderedSteps[0], [orderedSteps]);
  const getLastStep = useCallback(() => orderedSteps[orderedSteps.length - 1], [orderedSteps]);
  const getPrevStep = useCallback((step = currentStep) => step && orderedSteps[stepIndex(step) - 1], [currentStep, stepIndex, orderedSteps]);
  const getNextStep = useCallback((step = currentStep) => step && orderedSteps[stepIndex(step) + 1], [currentStep, stepIndex, orderedSteps]);
  const getNthStep = useCallback(n => orderedSteps[n - 1], [orderedSteps]);
  const isFirstStep = useMemo(() => currentStep === getFirstStep(), [currentStep, getFirstStep]);
  const isLastStep = useMemo(() => currentStep === getLastStep(), [currentStep, getLastStep]);
  const registerStep = useCallback(step => {
    dispatch({
      type: 'register',
      step
    });
  }, []);
  const unregisterStep = useCallback(stepName => {
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
//# sourceMappingURL=useStepsMap.js.map