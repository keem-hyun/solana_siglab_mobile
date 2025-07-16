import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useOnboardingStore } from '../hooks/useOnboardingStore';
import { OnboardingSlide } from './OnboardingSlide';
import { OnboardingControls } from './OnboardingControls';

export const OnboardingContainer: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { currentStep, steps, completeOnboarding } = useOnboardingStore();

  const handleComplete = () => {
    completeOnboarding();
    navigation.navigate('HomeStack' as never);
  };

  const currentData = steps[currentStep];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <OnboardingControls onComplete={handleComplete} />
      <OnboardingSlide step={currentData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});