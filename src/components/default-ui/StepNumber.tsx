import React from 'react';
import {
  Text,
  View,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTourGuide } from '../../contexts/TourGuideProvider';
import { styles } from '../style';

type StepNumberProps = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const StepNumber: React.FC<StepNumberProps> = ({
  style = {},
  textStyle = {},
}): JSX.Element => {
  const { currentStepNumber } = useTourGuide();

  return (
    <View style={[styles.stepNumber, style]}>
      <Text style={[styles.stepNumberText, textStyle]}>
        {currentStepNumber}
      </Text>
    </View>
  );
};

export default React.memo(StepNumber);
