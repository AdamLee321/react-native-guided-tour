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
  style?: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
} & Omit<TextProps, 'style'>;

export const Button = ({ wrapperStyle, style, textStyle, ...rest }: Props) => (
  <View style={[styles.button, wrapperStyle, style]}>
    <Text style={[styles.buttonText, textStyle]} {...rest} />
  </View>
);
