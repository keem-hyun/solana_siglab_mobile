import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuthorization } from '../../../utils/useAuthorization';

export const WelcomeHeader: React.FC = () => {
  const theme = useTheme();
  const { selectedAccount } = useAuthorization();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.primaryContainer }]}>
      <Card.Content style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcon
            name="robot-happy"
            size={40}
            color={theme.colors.primary}
          />
        </View>
        
        <View style={styles.textContainer}>
          <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.onPrimaryContainer }]}>
            {selectedAccount ? '안녕하세요!' : 'GPS 기반 AI 보험에 오신 것을 환영합니다!'}
          </Text>
          
          <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onPrimaryContainer }]}>
            {selectedAccount 
              ? 'AI 에이전트가 위치 기반 맞춤 보험을 도와드릴게요' 
              : '시작하려면 먼저 지갑을 연결해주세요'
            }
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.8,
  },
});