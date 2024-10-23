import { type FunctionComponent } from 'react';
import { Text, View } from 'react-native';
import { useTourGuide } from '../../contexts/TourGuideProvider';

import { styles } from '../style';

export const StepNumber: FunctionComponent<unknown> = () => {
  const { currentStepNumber } = useTourGuide();

  return (
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>{currentStepNumber}</Text>
    </View>
  );
};
