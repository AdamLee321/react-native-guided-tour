import { type StyleProp, type ViewStyle, type TextStyle, type TextProps } from 'react-native';
import React from 'react';
type Props = {
    wrapperStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
} & Omit<TextProps, 'style'>;
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
//# sourceMappingURL=Button.d.ts.map