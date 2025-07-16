export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
}

export interface WalletConnectionState {
  isConnected: boolean;
  address?: string;
  balance?: number;
}

export interface HomeState {
  quickActions: QuickAction[];
  recentActivity: any[];
  isLoading: boolean;
  error?: string;
}