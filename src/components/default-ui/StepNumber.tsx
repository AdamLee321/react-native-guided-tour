import { type FunctionComponent } from 'react';
import { Text, View } from 'react-native';
import { useTourGuide } from '../../contexts/TourGuideProvider';
import { styles } from '../style';

export const StepNumber: FunctionComponent<{ color: string }> = ({ color }) => {
  const { currentStepNumber } = useTourGuide();

  return (
    <View style={[styles.stepNumber, { backgroundColor: color }]}>
      <Text style={styles.stepNumberText}>{currentStepNumber}</Text>
    </View>
  );
};
