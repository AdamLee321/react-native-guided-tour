import { Text, TouchableOpacity, View } from 'react-native';

import { Button } from './Button';

import { styles } from '../style';

import type { TooltipProps } from '../../types';
import { useTourGuide } from '../../contexts/TourGuideProvider';

export const Tooltip = ({
  labels,
  tooltipTextStyle,
  buttonStyle,
  buttonTextStyle,
}: TooltipProps) => {
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
        <Text
          testID="stepDescription"
          style={[styles.tooltipText, { ...tooltipTextStyle }]}
        >
          {currentStep?.text}
        </Text>
      </View>
      <View style={[styles.bottomBar]}>
        {!isLastStep ? (
          <TouchableOpacity onPress={handleStop}>
            <Button style={buttonStyle} textStyle={buttonTextStyle}>
              {labels.skip}
            </Button>
          </TouchableOpacity>
        ) : null}
        {!isFirstStep ? (
          <TouchableOpacity onPress={handlePrev}>
            <Button style={buttonStyle} textStyle={buttonTextStyle}>
              {labels.previous}
            </Button>
          </TouchableOpacity>
        ) : null}
        {!isLastStep ? (
          <TouchableOpacity onPress={handleNext}>
            <Button style={buttonStyle} textStyle={buttonTextStyle}>
              {labels.next}
            </Button>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStop}>
            <Button style={buttonStyle} textStyle={buttonTextStyle}>
              {labels.finish}
            </Button>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
