import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  TextInput, 
  FAB, 
  useTheme, 
  Chip,
  Avatar
} from 'react-native-paper';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'insurance_offer' | 'location_info';
  insuranceData?: {
    location: string;
    duration: string;
    price: string;
    coverage: string[];
  };
}

const quickActions = [
  { id: '1', label: '여행 보험', icon: 'airplane' },
  { id: '2', label: '페스티벌 보험', icon: 'music' },
  { id: '3', label: '등산 보험', icon: 'mountain' },
  { id: '4', label: '현재 위치 보험', icon: 'map-marker' },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '안녕하세요! GPS 기반 AI 보험 에이전트입니다. 어떤 보험이 필요하신가요?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const theme = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // AI 응답 시뮬레이션
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: '위치를 확인하고 있습니다. 잠시만 기다려주세요...',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    const message: Message = {
      id: Date.now().toString(),
      text: `${action.label} 추천해주세요`,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  };

  const renderMessage = (message: Message) => {
    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          message.isUser ? styles.userMessage : styles.aiMessage,
        ]}
      >
        {!message.isUser && (
          <Avatar.Icon
            size={32}
            icon="robot"
            style={[styles.avatar, { backgroundColor: theme.colors.primaryContainer }]}
          />
        )}
        
        <Card
          style={[
            styles.messageCard,
            {
              backgroundColor: message.isUser 
                ? theme.colors.primary 
                : theme.colors.surface,
            },
          ]}
        >
          <Card.Content style={styles.messageContent}>
            <Text
              style={{
                color: message.isUser 
                  ? theme.colors.onPrimary 
                  : theme.colors.onSurface,
              }}
            >
              {message.text}
            </Text>
            
            {message.type === 'insurance_offer' && message.insuranceData && (
              <View style={styles.insuranceOffer}>
                <Text variant="titleSmall" style={{ marginTop: 10, marginBottom: 5 }}>
                  추천 보험
                </Text>
                <Text>📍 {message.insuranceData.location}</Text>
                <Text>⏰ {message.insuranceData.duration}</Text>
                <Text>💰 {message.insuranceData.price}</Text>
                <Button mode="contained" style={{ marginTop: 10 }}>
                  가입하기
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>
        
        {message.isUser && (
          <Avatar.Icon
            size={32}
            icon="account"
            style={[styles.avatar, { backgroundColor: theme.colors.secondary }]}
          />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* 현재 위치 표시 */}
      <Card style={[styles.locationCard, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Card.Content style={styles.locationContent}>
          <MaterialCommunityIcon 
            name="map-marker" 
            size={16} 
            color={theme.colors.primary} 
          />
          <Text variant="bodySmall" style={{ marginLeft: 5 }}>
            현재 위치: 서울시 강남구
          </Text>
        </Card.Content>
      </Card>

      {/* 채팅 영역 */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(renderMessage)}
      </ScrollView>

      {/* 퀵 액션 버튼들 */}
      <View style={styles.quickActions}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickActions.map((action) => (
            <Chip
              key={action.id}
              icon={action.icon}
              onPress={() => handleQuickAction(action)}
              style={[styles.quickActionChip, { backgroundColor: theme.colors.secondaryContainer }]}
            >
              {action.label}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {/* 입력 영역 */}
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="메시지를 입력하세요..."
          value={inputText}
          onChangeText={setInputText}
          style={styles.textInput}
          right={
            <TextInput.Icon
              icon="send"
              onPress={handleSendMessage}
              disabled={!inputText.trim()}
            />
          }
          onSubmitEditing={handleSendMessage}
        />
      </View>

      {/* 음성 입력 FAB */}
      <FAB
        icon="microphone"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => {
          // 음성 입력 기능 구현
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationCard: {
    margin: 10,
    elevation: 2,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chatContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  messageCard: {
    maxWidth: width * 0.7,
    elevation: 2,
  },
  messageContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  avatar: {
    marginHorizontal: 5,
  },
  insuranceOffer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  quickActions: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quickActionChip: {
    marginRight: 8,
  },
  inputContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingBottom: 10,
  },
  textInput: {
    backgroundColor: 'transparent',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 80,
  },
});