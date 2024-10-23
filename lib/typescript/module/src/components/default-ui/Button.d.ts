import { type StyleProp, type ViewStyle, type TextStyle, type TextProps } from 'react-native';
type Props = {
    wrapperStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
    color: string;
} & Omit<TextProps, 'style'>;
export declare const Button: ({ wrapperStyle, style, color, ...rest }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map