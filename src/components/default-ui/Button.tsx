import {
  View,
  Text,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type TextProps,
} from 'react-native';
import React from 'react';
import { styles } from '../style';

type Props = {
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
} & Omit<TextProps, 'style'>;

const Button: React.FC<Props> = ({
  wrapperStyle = {},
  style = {},
  textStyle = {},
  ...rest
}) => {
  return (
    <View style={[styles.button, wrapperStyle, style]}>
      <Text style={[styles.buttonText, textStyle]} {...rest} />
    </View>
  );
};

export default React.memo(Button);
