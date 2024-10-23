import { type Emitter } from 'mitt';
import { type PropsWithChildren } from 'react';
import { type ScrollView } from 'react-native';
import { type TourGuideOptions, type Step } from '../types';
type Events = {
    start: undefined;
    stop: undefined;
    stepChange: Step | undefined;
};
interface TourGuideContextType {
    registerStep: (step: Step) => void;
    unregisterStep: (stepName: string) => void;
    currentStep: Step | undefined;
    start: (fromStep?: string, suppliedScrollView?: ScrollView | null) => Promise<void>;
    stop: () => Promise<void>;
    goToNext: () => Promise<void>;
    goToNth: (n: number) => Promise<void>;
    goToPrev: () => Promise<void>;
    visible: boolean;
    TourGuideEvents: Emitter<Events>;
    isFirstStep: boolean;
    isLastStep: boolean;
    currentStepNumber: number;
    totalStepsNumber: number;
}
export declare const TourGuideProvider: ({ verticalOffset, children, ...rest }: PropsWithChildren<TourGuideOptions>) => import("react/jsx-runtime").JSX.Element;
export declare const useTourGuide: () => TourGuideContextType;
export {};
//# sourceMappingURL=TourGuideProvider.d.ts.map