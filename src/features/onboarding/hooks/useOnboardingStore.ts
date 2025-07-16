import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingState, OnboardingStep } from '../types';

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: 'GPS 기반 스마트 보험',
    description: '위치를 인식하여 자동으로 맞춤형 보험을 추천하고 관리합니다.',
    icon: 'map-marker-radius',
  },
  {
    id: 2,
    title: 'AI 에이전트와 대화',
    description: '"제주도 여행 보험 필요해"라고 말하면 AI가 알아서 준비해드려요.',
    icon: 'robot-happy',
  },
  {
    id: 3,
    title: '자동 보험 관리',
    description: '여행지 도착과 함께 보험이 시작되고, 귀가와 함께 자동 정산됩니다.',
    icon: 'shield-check',
  },
  {
    id: 4,
    title: 'Solana Mobile 지갑',
    description: '모바일 지갑으로 안전하고 빠른 보험료 결제를 지원합니다.',
    icon: 'wallet',
  },
];

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      isCompleted: false,
      hasSeenOnboarding: false,
      steps: onboardingSteps,
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      nextStep: () => {
        const { currentStep, steps } = get();
        if (currentStep < steps.length - 1) {
          set({ currentStep: currentStep + 1 });
        } else {
          get().completeOnboarding();
        }
      },
      
      skipOnboarding: () => {
        set({ 
          isCompleted: true, 
          hasSeenOnboarding: true,
          currentStep: 0 
        });
      },
      
      completeOnboarding: () => {
        set({ 
          isCompleted: true, 
          hasSeenOnboarding: true,
          currentStep: 0 
        });
      },
      
      resetOnboarding: () => {
        set({ 
          currentStep: 0, 
          isCompleted: false, 
          hasSeenOnboarding: false 
        });
      },
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);