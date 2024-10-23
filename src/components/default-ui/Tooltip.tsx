import React from 'react';
import { Text, View } from 'react-native';
import Button from './Button';
import { styles } from '../style';
import type { TooltipProps } from '../../types';
import { useTourGuide } from '../../contexts/TourGuideProvider';

const Tooltip: React.FC<TooltipProps> = ({
  labels,
  tooltipTextStyle = {},
  buttonStyle = {},
  buttonTextStyle = {},
}) => {
  const { goToNext, goToPrev, stop, currentStep, isFirstStep, isLastStep } =
    useTourGuide();

  const handleStop = () => stop();
  const handleNext = () => goToNext();
  const handlePrev = () => goToPrev();

  return (
    <View>
      <View style={styles.tooltipContainer}>
        <Text
          testID="stepDescription"
          style={[styles.tooltipText, tooltipTextStyle]}
        >
          {currentStep?.text}
        </Text>
      </View>
      <View style={styles.bottomBar}>
        {!isLastStep && (
          <Button
            style={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={handleStop}
          >
            {labels.skip}
          </Button>
        )}
        {!isFirstStep && (
          <Button
            style={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={handlePrev}
          >
            {labels.previous}
          </Button>
        )}
        {!isLastStep ? (
          <Button
            style={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={handleNext}
          >
            {labels.next}
          </Button>
        ) : (
          <Button
            style={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={handleStop}
          >
            {labels.finish}
          </Button>
        )}
      </View>
    </View>
  );
};

export default React.memo(Tooltip);
