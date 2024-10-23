import { type Emitter } from 'mitt';
import { type PropsWithChildren } from 'react';
import { type ScrollView } from 'react-native';
import { type CopilotOptions, type Step } from '../types';
type Events = {
    start: undefined;
    stop: undefined;
    stepChange: Step | undefined;
};
interface CopilotContextType {
    registerStep: (step: Step) => void;
    unregisterStep: (stepName: string) => void;
    currentStep: Step | undefined;
    start: (fromStep?: string, suppliedScrollView?: ScrollView | null) => Promise<void>;
    stop: () => Promise<void>;
    goToNext: () => Promise<void>;
    goToNth: (n: number) => Promise<void>;
    goToPrev: () => Promise<void>;
    visible: boolean;
    copilotEvents: Emitter<Events>;
    isFirstStep: boolean;
    isLastStep: boolean;
    currentStepNumber: number;
    totalStepsNumber: number;
}
export declare const CopilotProvider: ({ verticalOffset, children, ...rest }: PropsWithChildren<CopilotOptions>) => import("react/jsx-runtime").JSX.Element;
export declare const useCopilot: () => CopilotContextType;
export {};
//# sourceMappingURL=CopilotProvider.d.ts.map