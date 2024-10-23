import { type LayoutRectangle } from 'react-native';
import type { CopilotOptions } from '../types';
export interface CopilotModalHandle {
    animateMove: (obj: LayoutRectangle) => Promise<void>;
}
export declare const CopilotModal: import("react").ForwardRefExoticComponent<CopilotOptions & import("react").RefAttributes<CopilotModalHandle>>;
//# sourceMappingURL=CopilotModal.d.ts.map