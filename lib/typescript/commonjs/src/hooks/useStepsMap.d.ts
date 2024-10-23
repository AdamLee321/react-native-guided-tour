import { type Step, type StepsMap } from '../types';
export declare const useStepsMap: () => {
    currentStepNumber: number;
    totalStepsNumber: number;
    getFirstStep: () => Step | undefined;
    getLastStep: () => Step | undefined;
    getPrevStep: (step?: Step | undefined) => Step | undefined;
    getNextStep: (step?: Step | undefined) => Step | undefined;
    getNthStep: (n: number) => Step | undefined;
    isFirstStep: boolean;
    isLastStep: boolean;
    currentStep: Step | undefined;
    setCurrentStepState: import("react").Dispatch<import("react").SetStateAction<Step | undefined>>;
    steps: StepsMap;
    registerStep: (step: Step) => void;
    unregisterStep: (stepName: string) => void;
};
//# sourceMappingURL=useStepsMap.d.ts.map