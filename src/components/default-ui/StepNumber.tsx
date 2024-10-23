import { type FunctionComponent } from 'react';
import { Text, View, type ViewStyle, type TextStyle } from 'react-native';
import { useTourGuide } from '../../contexts/TourGuideProvider';
import { styles } from '../style';

export const StepNumber: FunctionComponent<{
  style: ViewStyle;
  textStyle: TextStyle;
}> = ({ style, textStyle }) => {
  const { currentStepNumber } = useTourGuide();

  return (
    <View style={[styles.stepNumber, { ...style }]}>
      <Text style={[styles.stepNumberText, { ...textStyle }]}>
        {currentStepNumber}
      </Text>
    </View>
  );
};
