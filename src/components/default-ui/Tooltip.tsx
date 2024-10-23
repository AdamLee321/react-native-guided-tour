import { Text, TouchableOpacity, View } from 'react-native';

import { Button } from './Button';

import { styles } from '../style';

import type { TooltipProps } from '../../types';
import { useTourGuide } from '../../contexts/TourGuideProvider';

export const Tooltip = ({ labels, color = '#0075C8' }: TooltipProps) => {
  const { goToNext, goToPrev, stop, currentStep, isFirstStep, isLastStep } =
    useTourGuide();

  const handleStop = () => {
    void stop();
  };
  const handleNext = () => {
    void goToNext();
  };

  const handlePrev = () => {
    void goToPrev();
  };

  return (
    <View>
      <View style={styles.tooltipContainer}>
        <Text testID="stepDescription" style={styles.tooltipText}>
          {currentStep?.text}
        </Text>
      </View>
      <View style={[styles.bottomBar]}>
        {!isLastStep ? (
          <TouchableOpacity onPress={handleStop}>
            <Button color={color}>{labels.skip}</Button>
          </TouchableOpacity>
        ) : null}
        {!isFirstStep ? (
          <TouchableOpacity onPress={handlePrev}>
            <Button color={color}>{labels.previous}</Button>
          </TouchableOpacity>
        ) : null}
        {!isLastStep ? (
          <TouchableOpacity onPress={handleNext}>
            <Button color={color}>{labels.next}</Button>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStop}>
            <Button color={color}>{labels.finish}</Button>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
