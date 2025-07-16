export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface OnboardingState {
  currentStep: number;
  isCompleted: boolean;
  hasSeenOnboarding: boolean;
  steps: OnboardingStep[];
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  skipOnboarding: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}