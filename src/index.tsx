import StepNumber from './components/default-ui/StepNumber';
import Tooltip from './components/default-ui/Tooltip';
export { walkthroughable } from './hocs/walkthroughable';
export { TourGuideStep } from './components/TourGuideStep';
export { TourGuideProvider, useTourGuide } from './contexts/TourGuideProvider';
export type { TourGuideOptions as TourGuideProps, TooltipProps } from './types';

export const DefaultUI = {
  StepNumber,
  Tooltip,
};
