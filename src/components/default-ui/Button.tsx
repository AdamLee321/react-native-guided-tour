import {
  View,
  Text,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type TextProps,
} from 'react-native';

import { styles } from '../style';

type Props = {
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  color: string;
} & Omit<TextProps, 'style'>;

export const Button = ({ wrapperStyle, style, color, ...rest }: Props) => (
  <View style={[styles.button, wrapperStyle]}>
    <Text style={[styles.buttonText, { color }, style]} {...rest} />
  </View>
);
