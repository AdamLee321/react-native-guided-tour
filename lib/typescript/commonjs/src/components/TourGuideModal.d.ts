import { type LayoutRectangle } from 'react-native';
import type { TourGuideOptions } from '../types';
export interface TourGuideModalHandle {
    animateMove: (obj: LayoutRectangle) => Promise<void>;
}
export declare const TourGuideModal: import("react").ForwardRefExoticComponent<TourGuideOptions & import("react").RefAttributes<TourGuideModalHandle>>;
//# sourceMappingURL=TourGuideModal.d.ts.map