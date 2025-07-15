import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

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

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();
  const theme = useTheme();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('HomeStack' as never);
    }
  };

  const handleSkip = () => {
    navigation.navigate('HomeStack' as never);
  };

  const currentData = onboardingSteps[currentStep];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Button 
          mode="text" 
          onPress={handleSkip}
          labelStyle={{ color: theme.colors.onSurfaceVariant }}
        >
          건너뛰기
        </Button>
      </View>

      <View style={styles.content}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryContainer }]}>
              <MaterialCommunityIcon
                name={currentData.icon as any}
                size={60}
                color={theme.colors.primary}
              />
            </View>
            
            <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
              {currentData.title}
            </Text>
            
            <Text variant="bodyLarge" style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
              {currentData.description}
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingSteps.map((_, index) => (
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
          {currentStep === onboardingSteps.length - 1 ? '시작하기' : '다음'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 50,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.9,
    elevation: 4,
    borderRadius: 20,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingBottom: 50,
    alignItems: 'center',
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