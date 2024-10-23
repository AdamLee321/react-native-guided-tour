import mitt, { type Emitter } from 'mitt';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import { findNodeHandle, type ScrollView } from 'react-native';
import {
  TourGuideModal,
  type TourGuideModalHandle,
} from '../components/TourGuideModal';
import { OFFSET_WIDTH } from '../components/style';
import { useStateWithAwait } from '../hooks/useStateWithAwait';
import { useStepsMap } from '../hooks/useStepsMap';
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
  start: (
    fromStep?: string,
    suppliedScrollView?: ScrollView | null
  ) => Promise<void>;
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

/*
This is the maximum wait time for the steps to be registered before starting the tutorial
At 60fps means 2 seconds
*/
const MAX_START_TRIES = 120;

const TourGuideContext = createContext<TourGuideContextType | undefined>(
  undefined
);

export const TourGuideProvider = ({
  verticalOffset = 0,
  children,
  ...rest
}: PropsWithChildren<TourGuideOptions>) => {
  const startTries = useRef(0);
  const TourGuideEvents = useRef(mitt<Events>()).current;
  const modal = useRef<TourGuideModalHandle | null>(null);

  const [visible, setVisibility] = useStateWithAwait(false);
  const [scrollView, setScrollView] = useState<ScrollView | null>(null);

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
    unregisterStep,
  } = useStepsMap();

  const moveModalToStep = useCallback(
    async (step: Step) => {
      const size = await step?.measure();

      if (!size) {
        return;
      }

      await modal.current?.animateMove({
        width: size.width + OFFSET_WIDTH,
        height: size.height + OFFSET_WIDTH,
        x: size.x - OFFSET_WIDTH / 2,
        y: size.y - OFFSET_WIDTH / 2 + verticalOffset,
      });
    },
    [verticalOffset]
  );

  const setCurrentStep = useCallback(
    async (step?: Step, move: boolean = true) => {
      setCurrentStepState(step);
      TourGuideEvents.emit('stepChange', step);

      if (scrollView != null) {
        const nodeHandle = findNodeHandle(scrollView);
        if (nodeHandle) {
          step?.wrapperRef.current?.measureLayout(
            nodeHandle,
            (_x, y, _w, h) => {
              const yOffset = y > 0 ? y - h / 2 : 0;
              scrollView.scrollTo({ y: yOffset, animated: false });
            }
          );
        }
      }

      setTimeout(
        () => {
          if (move && step) {
            void moveModalToStep(step);
          }
        },
        scrollView != null ? 100 : 0
      );
    },
    [TourGuideEvents, moveModalToStep, scrollView, setCurrentStepState]
  );

  const start = useCallback(
    async (fromStep?: string, suppliedScrollView: ScrollView | null = null) => {
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
        TourGuideEvents.emit('start');
        await setCurrentStep(currentStep);
        await moveModalToStep(currentStep);
        await setVisibility(true);
        startTries.current = 0;
      }
    },
    [
      TourGuideEvents,
      getFirstStep,
      moveModalToStep,
      scrollView,
      setCurrentStep,
      setVisibility,
      steps,
    ]
  );

  const stop = useCallback(async () => {
    await setVisibility(false);
    TourGuideEvents.emit('stop');
  }, [TourGuideEvents, setVisibility]);

  const next = useCallback(async () => {
    await setCurrentStep(getNextStep());
  }, [getNextStep, setCurrentStep]);

  const nth = useCallback(
    async (n: number) => {
      await setCurrentStep(getNthStep(n));
    },
    [getNthStep, setCurrentStep]
  );

  const prev = useCallback(async () => {
    await setCurrentStep(getPrevStep());
  }, [getPrevStep, setCurrentStep]);

  const value = useMemo(
    () => ({
      registerStep,
      unregisterStep,
      currentStep,
      start,
      stop,
      visible,
      TourGuideEvents,
      goToNext: next,
      goToNth: nth,
      goToPrev: prev,
      isFirstStep,
      isLastStep,
      currentStepNumber,
      totalStepsNumber,
    }),
    [
      registerStep,
      unregisterStep,
      currentStep,
      start,
      stop,
      visible,
      TourGuideEvents,
      next,
      nth,
      prev,
      isFirstStep,
      isLastStep,
      currentStepNumber,
      totalStepsNumber,
    ]
  );

  return (
    <TourGuideContext.Provider value={value}>
      <>
        <TourGuideModal ref={modal} {...rest} />
        {children}
      </>
    </TourGuideContext.Provider>
  );
};

export const useTourGuide = () => {
  const value = useContext(TourGuideContext);
  if (value == null) {
    throw new Error('You must wrap your app inside TourGuideProvider');
  }

  return value;
};
