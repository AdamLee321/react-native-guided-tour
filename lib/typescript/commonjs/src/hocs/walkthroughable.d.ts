import React, { type FunctionComponent } from 'react';
import { type NativeMethods } from 'react-native/types';
interface TourGuideProps {
    ref?: React.RefObject<NativeMethods>;
    onLayout?: () => void;
}
export declare function walkthroughable<P extends object>(WrappedComponent: React.ComponentType<P & TourGuideProps>): FunctionComponent<Omit<P, keyof TourGuideProps>>;
export {};
//# sourceMappingURL=walkthroughable.d.ts.map