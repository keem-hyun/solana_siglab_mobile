import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useOnboardingStore } from '../hooks/useOnboardingStore';

const { width } = Dimensions.get('window');

interface OnboardingControlsProps {
  onComplete: () => void;
}

export const OnboardingControls: React.FC<OnboardingControlsProps> = ({ onComplete }) => {
  const theme = useTheme();
  const { 
    currentStep, 
    steps, 
    nextStep, 
    skipOnboarding 
  } = useOnboardingStore();

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      onComplete();
    } else {
      nextStep();
    }
  };

  const handleSkip = () => {
    skipOnboarding();
    onComplete();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button 
          mode="text" 
          onPress={handleSkip}
          labelStyle={{ color: theme.colors.onSurfaceVariant }}
        >
          건너뛰기
        </Button>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentStep 
                    ? theme.colors.primary 
                    : theme.colors.outline,
                },
              ]}
            />
          ))}
        </View>

        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.nextButton}
          contentStyle={styles.nextButtonContent}
        >
          {currentStep === steps.length - 1 ? '시작하기' : '다음'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  footer: {
    paddingBottom: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  nextButton: {
    width: width * 0.8,
    borderRadius: 25,
  },
  nextButtonContent: {
    paddingVertical: 8,
  },
});