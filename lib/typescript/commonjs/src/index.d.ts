export { walkthroughable } from './hocs/walkthroughable';
export { TourGuideStep } from './components/TourGuideStep';
export { TourGuideProvider, useTourGuide } from './contexts/TourGuideProvider';
export type { TourGuideOptions as TourGuideProps, TooltipProps } from './types';
export declare const DefaultUI: {
    StepNumber: import("react").FunctionComponent<{
        style: import("react-native").ViewStyle;
        textStyle: import("react-native").TextStyle;
    }>;
    Tooltip: ({ labels, tooltipTextStyle, buttonStyle, buttonTextStyle, }: import("./types").TooltipProps) => import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=index.d.ts.map