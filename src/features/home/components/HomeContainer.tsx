import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { WelcomeHeader } from './WelcomeHeader';
import { QuickActions } from './QuickActions';
import { WalletStatus } from './WalletStatus';

export const HomeContainer: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <WelcomeHeader />
        <QuickActions />
        <WalletStatus />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});