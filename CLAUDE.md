# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `yarn start` - Start Expo development server
- `yarn android` - Start on Android device/emulator
- `yarn ios` - Start on iOS device/emulator (limited functionality)
- `yarn web` - Start web version

### Build Commands
- `yarn build` - Build development APK using EAS Build for Android
- `yarn build:local` - Build development APK locally using EAS Build
- `npx eas build --profile development --platform android` - Direct EAS build command

### Testing
- `yarn test` - No tests configured (placeholder script)

## Project Architecture

### Core Technology Stack
- **React Native (v0.76)** with **Expo (v53)** - Mobile framework
- **TypeScript** - Primary language with strict mode enabled
- **Solana Mobile Wallet Adapter** - Blockchain integration for mobile wallets
- **React Navigation (v6)** - Navigation system
- **React Native Paper (v5.12)** - Material Design components
- **TanStack Query (v5.24)** - State management and data fetching

### Key Mobile Blockchain Features
- **Mobile Wallet Adapter Protocol** - Connects to Solana mobile wallets
- **Solana Web3.js** - Blockchain interactions
- **SPL Token support** - Token operations
- **Polyfills** - Required crypto and Buffer polyfills for React Native

### Application Structure

#### Main App Entry (`App.tsx`)
- Wraps app with providers: QueryClient, ClusterProvider, ConnectionProvider, PaperProvider
- Handles dark/light theme switching
- Integrates Material Design 3 themes with React Navigation

#### Key Providers & Contexts
- **ClusterProvider** (`src/components/cluster/cluster-data-access.tsx`) - Manages Solana cluster selection (devnet/testnet)
- **ConnectionProvider** (`src/utils/ConnectionProvider.tsx`) - Provides Solana RPC connection
- **useAuthorization** (`src/utils/useAuthorization.tsx`) - Manages wallet authorization and account state
- **useMobileWallet** (`src/utils/useMobileWallet.tsx`) - Core mobile wallet operations

#### Navigation Architecture
- **AppNavigator** (`src/navigators/AppNavigator.tsx`) - Root navigation container
- **HomeNavigator** (`src/navigators/HomeNavigator.tsx`) - Home stack navigation
- Stack-based navigation with TypeScript route definitions

#### Component Structure
- **Feature-based organization** under `src/components/`
- Each feature has data access, UI, and feature components
- Components follow `feature-name-type.tsx` naming convention

### Solana Integration Patterns

#### Wallet Connection Flow
1. User initiates connection through UI
2. `useMobileWallet.connect()` triggers Mobile Wallet Adapter
3. `useAuthorization` manages account state and persistence
4. Authorization cached in AsyncStorage

#### Transaction Signing
- Uses `signAndSendTransaction` from `useMobileWallet`
- Automatically handles wallet authorization
- Supports both Transaction and VersionedTransaction types

#### Cluster Management
- Defaults to devnet cluster
- Supports testnet and custom endpoints
- Explorer URLs generated automatically for transactions

### Mobile-Specific Considerations
- **Android-only functionality** - Mobile Wallet Adapter only works on Android
- **Polyfills required** - Crypto and Buffer polyfills in `src/polyfills.ts`
- **EAS Build required** - Cannot use Expo Go, must use development build
- **Metro configuration** - Custom metro config for React Native compatibility

### Development Workflow
1. Use `yarn start` to start development server
2. Use `--tunnel` flag if connection issues occur
3. Ensure Android device/emulator has MWA-compatible wallet installed
4. Use EAS Build for testing on physical devices

## Project Context

This is a **GPS-based AI agent insurance DApp** for Solana Mobile that provides location-aware micro-insurance products. The app focuses on:

- **Location-based insurance** - Travel, festival, and activity insurance triggered by GPS
- **AI agent interaction** - Natural language insurance creation and management
- **Geofencing automation** - Automatic insurance activation based on location
- **Mobile-first design** - Optimized for Android mobile wallet integration

The current implementation serves as a foundation template with Solana Mobile Wallet Adapter integration, React Navigation, and Material Design components ready for building the GPS-based insurance features.