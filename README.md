# Solana Mobile Expo Template

This template is a ready-to-go Android Expo dApp that offers:

- Solana libraries: `web3.js`, Mobile Wallet Adapter, and `spl-token`.
- Required polyfills like `crypto` and `Buffer` configured.
- Pre-built React UI and re-usable hooks and code patterns like `useMobileWallet`.

**This is only fully functional on Android.**

<table>
  <tr>
    <td align="center">
      <img src="./screenshots/screenshot1.png" alt="Scaffold dApp Screenshot 1" width=300 />
    </td>
    <td align="center">
      <img src="./screenshots/screenshot2.png" alt="Scaffold dApp Screenshot 2" width=300 />
    </td>
    <td align="center">
      <img src="./screenshots/screenshot3.png" alt="Scaffold dApp Screenshot 3" width=300 />
    </td>
  </tr>
</table>

## Tech Stack

| Library               | Category          | Version | Description                                           |
| --------------------- | ----------------- | ------- | ----------------------------------------------------- |
| React Native          | Mobile Framework  | v0.76   | The best cross-platform mobile framework              |
| Expo                  | SDK               | v52     | Allows (optional) Expo modules                        |
| React                 | UI Framework      | v18.3   | The most popular UI framework in the world            |
| Mobile Wallet Adapter | SDK               | v2.1    | Connect and request signing from mobile wallet apps   |
| Solana web3.js        | SDK               | v1.78   | General Solana library for transactions and RPCs      |
| spl-token             | SDK               | v0.4    | Library for building with Solana SPL tokens           |
| React Native Paper    | Component Library | v5.12   | Production-ready components following Material Design |
| React Navigation      | Navigation        | v6      | Performant and consistent navigation framework        |
| TanStack Query        | State management  | v5.24   | Server state & async query management                |
| TypeScript            | Language          | v5      | Static typechecking                                   |
| AsyncStorage          | Persistence       | v1.23   | State persistence                                     |

## Quick Start

### Prerequisites

- A free [Expo](https://expo.dev/) account.
- An Android device/emulator to test your app
  - Install an MWA compliant wallet app on your device/emulator.
- If using Expo's cloud service `eas build`, no further setup is required.
- If building locally:
  - React Native and Android Envrionment [setup](https://docs.solanamobile.com/getting-started/development-setup)

### Initialize

Run the CLI command:

```
yarn create expo-app --template @solana-mobile/solana-mobile-expo-template
```

Choose your project name then navigate into the directory.

### Build and run the app

Once your app is initialized, follow the **["Running the app"](https://docs.solanamobile.com/react-native/expo#running-the-app)** guide to launch the template as a custom development build.

## Troubleshooting

- `Metro has encountered an error: While trying to resolve module @solana-mobile/mobile-wallet-adapter-protocol...`

  - This is an on-going issue when using `npm install` to install the Expo template.
  - To mitigate, clean your project dependencies and reinstall with `yarn install`

- `The package 'solana-mobile-wallet-adapter-protocol' doesn't seem to be linked. Make sure: ...`

  - Ensure you are _NOT_ using Expo Go to run your app.
  - You need to be using an [Expo custom development build](https://docs.solanamobile.com/react-native/expo#custom-development-build), rather than Expo Go.

- `failed to connect to...`

  - This is an Expo error that can occur when trying to connect to the dev server on certain Wifi networks.
  - To fix, try starting the dev server with the `--tunnel` command (`npx expo start --dev-client --tunnel`)

- `Error: crypto.getRandomValues() not supported`
  - This is a polyfill issue when trying to use certain functions from the `@solana/web3.js` in a React Native/Expo environment.
  - To fix, ensure your App properly imports and uses the polyfills like in this [guide](http://docs.solanamobile.com/react-native/expo#step-3-update-appjs-with-polyfills).

<br>

- `error Failed to load configuration of your project.`
  - Same as above, but for `yarn`. [Uninstall and reinstall](https://github.com/react-native-community/cli#updating-the-cli) the CLI through yarn.

<br>

- `Looks like your iOS environment is not properly set`:
  - You can ignore this during template initialization and build the Android app as normal. This template is only compatible with Android.

<br>

- `Usage Error: It seems you are trying to add a package using a https:... url; we now require package names to be explicitly specified.`
  - This error happens on certain versions of `yarn`, and occurs if you try to initialize the template through the Github repo URL, rather than the npm package. To avoid this, use the `@solana-mobile/solana-mobile-dapp-scaffold` package as specified, or downgrade your `yarn` version to classic (1.22.x).

<br>

- `error Couldn't find the ".../@solana-mobile/solana-mobile-dapp-scaffold/template.config.js file inside "@solana-mobile/solana-mobile-dapp-scaffold" template.`
  - This is a [known error](https://github.com/react-native-community/cli/issues/1924) that occurs with certain versions of `yarn` (>= 3.5.0). It is fixed by running the cli command with the `--npm` flag or downgrading your version of `yarn`.

# AI 에이전트 기반 위치 인식 스마트 보험 DApp

## 프로젝트 개요

사용자가 자연어로 위치 기반 보험을 요청하면, **AI 에이전트가 GPS 정보를 활용해 맞춤형 보험을 자동 생성**하는 혁신적인 DApp입니다. 여행, 페스티벌, 행사 등 위치 기반 활동에 특화된 마이크로 보험을 Solana Mobile과 대화형 AI로 간편하게 제공합니다.

## 🤖 핵심 개념: Location-Based Agent Insurance

### 기존 방식 vs GPS 기반 에이전트 방식
**기존 방식:**
```
사용자 → 복잡한 양식 → 보험 상품 선택 → 가입
```

**GPS 에이전트 방식:**
```
사용자 → "제주도 여행 보험 필요해" → AI가 GPS로 위치 확인 → 해당 지역 맞춤 보험 자동 생성
```

### AI 에이전트의 GPS 활용 역할
- **위치 인식**: GPS 기반 실시간 위치 추적 및 지역 위험도 분석
- **지오펜싱**: 특정 지역 진입/이탈 시 자동 보험 활성화
- **지역별 최적화**: 해당 지역 특성에 맞는 보험 설계
- **자동 관리**: 여행 종료 시 자동 해지, 이벤트 종료 시 정산

## 🎯 주요 기능

### 1. GPS 기반 대화형 보험 생성
- **위치 인식 대화**: "내일 제주도 여행 가는데 3일간 보험 필요해"
- **지역별 위험도 분석**: GPS 위치의 날씨, 재해, 치안 정보 실시간 반영
- **장소별 맞춤 보험**: 해변(수상 사고), 산(등산 사고), 도시(교통사고) 등

### 2. 위치 기반 보험 유형
#### 🏖️ 여행 보험
- **국내/해외 여행**: GPS로 위치 감지
- **지역별 맞춤**: 제주(태풍), 강원(스키), 부산(해양) 특화
- **기후 고려**: 날씨를 고려하여 보험 비용 측정

#### 🎪 페스티벌/이벤트 보험
- **행사장 자동 인식**: 페스티벌 장소 진입 시 자동 보험 활성화
- **군중 밀집도 분석**: GPS 클러스터링으로 위험도 계산
- **시간제 보험**: 공연 시간에만 활성화되는 마이크로 보험
- **구역별 차등**: VIP존, 스탠딩존 등 위치별 보험료 차등

#### 🏃 액티비티 보험
- **스포츠 시설 인식**: 스키장, 서핑샵, 등산로 진입 감지
- **활동 시간 추적**: GPS 체류 시간 기반 자동 보험 시작/종료
- **난이도별 보험**: 초급/중급/고급 코스 위치별 보험료
- **날씨 연동**: 해당 지역 날씨에 따른 위험도 조정

### 3. 지오펜싱 기반 자동화
- **자동 활성화**: 설정된 지역 진입 시 보험 자동 시작
- **경계 알림**: 보험 지역 이탈 시 연장/종료 선택
- **다중 지역 설정**: 여러 관광지를 포함하는 광역 보험
- **시간대별 조정**: 낮/밤 시간대별 위험도 반영

## 📱 Agent-Centric 인터페이스 구조

### 메인 인터페이스: 대화 중심
1. **AI 어시스턴트 채팅** - 메인 화면 (70%)
2. **퀵 액션 패널** - 하단 고정 (30%)

### 🎯 화면별 상세 구조

#### 1. 메인 채팅 화면 (Main Chat Interface)
**AI 에이전트와의 위치 기반 대화**
- **여행 보험 요청**: "제주도 3박 4일 여행 보험 필요해"
- **페스티벌 보험**: "울트라 코리아 가는데 보험 추천해줘"
- **현재 위치 기반**: "지금 여기서 등산하려는데 보험 있어?"
- **지역 정보 제공**: "이 지역 위험 요소가 뭐야?"

**GPS 맵 뷰 통합**
- **실시간 위치 표시**: 현재 위치 및 보험 적용 지역 시각화
- **지오펜스 영역**: 보험 활성화 구역을 지도에 표시
- **경로 추적**: 여행 경로 및 위험도 히트맵
- **주변 정보**: 병원, 경찰서 등 긴급 시설 표시

#### 2. 퀵 액션 패널 (Quick Action Panel)
- **현재 위치 보험**: "여기서 2시간 보험"
- **빠른 여행 보험**: "오늘 당일치기 여행"
- **이벤트 감지**: 주변 페스티벌/행사 자동 표시
- **긴급 SOS**: 위치 기반 긴급 구조 요청

#### 3. 사이드 메뉴 (Hamburger Menu)
- **내 여행 기록**: GPS 기반 여행 히스토리 및 보험 내역
- **즐겨찾는 장소**: 자주 가는 곳 사전 보험 설정
- **지역별 통계**: 방문 지역별 보험금 청구 통계
- **위치 설정**: GPS 정확도, 배터리 절약 모드

## 🔄 Agent-Driven 사용자 플로우

### 여행 보험 생성 플로우
```
1. 사용자: "다음 주 제주도 3박 4일 여행 보험 필요해"
   ↓
2. AI 에이전트: 
   - 제주도 GPS 좌표 확인
   - 해당 기간 날씨 예보 체크
   - 제주 지역 특수 위험 분석 (태풍, 화산 활동 등)
   ↓
3. AI 제안: "제주도 3박 4일 여행 보험 준비했어요!
   - 기간: 김포공항 출발 ~ 귀환까지 자동 감지
   - 보장: 의료비, 도난, 렌터카 사고, 태풍 피해
   - 보험료: 0.05 SOL
   ↓
4. 사용자: "좋아, 가입할게"
   ↓
5. 자동 처리:
   - 지오펜스 설정 (제주도 전역)
   - 김포/제주 공항 도착 시 자동 활성화
   - 여행 종료 시 자동 해지
```

### 페스티벌 보험 플로우
```
1. GPS 감지: 사용자가 페스티벌 보험 생성 요구
   ↓
2. AI 제안: "당일 페스티벌 보험
   - 시간: 오늘 14:00 ~ 23:00 (공연 종료 시 자동 해지)
   - 보장: 인파 사고, 소지품 도난, 응급 의료
   - 보험료: 0.01 SOL
   ↓
3. 원터치 가입 & 행사장 진입 시 자동 활성화
```

### 액티비티 보험 플로우
```
1. 위치 확인 및 사용자 요청: 사용자가 등산로 입구 도착
   ↓
2. AI 분석:
   - 북한산 난이도 확인 (중급 코스)
   - 현재 날씨 및 산악 기상
   - 예상 소요 시간 (4시간)
   ↓
3. AI 제안: "북한산 등산 보험 추천드려요
   - 자동 시작: 등산로 진입 시
   - 자동 종료: 하산 완료 시
   - 보장: 조난, 부상, 헬기 구조
   - 보험료: 0.008 SOL"
   ↓
4. 등산 시작과 함께 보험 자동 활성화
   ↓
5. 하산 완료 시 자동 정산 및 종료
```

## 🤖 GPS 특화 AI 에이전트 시스템

### 위치 기반 멀티 에이전트
1. **위치 인식 에이전트 (Location Agent)**
   - GPS 데이터 실시간 처리
   - 지오펜싱 경계 관리
   - POI(관심지점) 자동 인식
   - 이동 패턴 학습

2. **지역 분석 에이전트 (Regional Risk Agent)**
   - 지역별 위험도 데이터베이스
   - 실시간 날씨/재해 정보 수집
   - 현지 의료/안전 인프라 평가
   - 시간대별 위험도 변화 추적

3. **여행 보험 설계 에이전트 (Travel Insurance Agent)**
   - 목적지 기반 보험 패키지 구성
   - 이동 수단별 보장 내용 조정
   - 체류 기간 최적화
   - 다국가 여행 시 자동 전환

4. **이벤트 보험 에이전트 (Event Insurance Agent)**
   - 행사장 실시간 모니터링
   - 군중 밀집도 분석
   - 시간제 마이크로 보험 관리
   - 행사 종료 후 자동 정산

## 💡 위치 기반 UX 설계 원칙

### GPS 중심 인터페이스
- **지도 우선**: 대화창과 지도를 동시에 표시
- **시각적 피드백**: 보험 적용 지역을 지도에 실시간 표시
- **위치 정확도**: GPS 신호 강도 및 정확도 상태 표시
- **오프라인 지원**: 지도 캐싱으로 해외 로밍 시에도 사용 가능

### 상황 인식 알림
- **지오펜스 진입**: "제주공항 도착! 여행 보험 활성화됐어요"
- **위험 지역 경고**: "이 지역은 범죄율이 높아요. 보장 강화할까요?"
- **일정 기반 제안**: "내일 한라산 일정이 있네요. 등산 보험 미리 준비할까요?"
- **자동 종료 알림**: "서울 도착 감지. 제주 여행 보험 종료됩니다"

### 프라이버시 보호
- **위치 권한 관리**: 필요시에만 정확한 위치 사용
- **익명화 옵션**: 위치 기록 익명화 저장
- **데이터 최소화**: 보험에 필요한 위치 정보만 수집
- **투명한 사용**: 위치 데이터 사용 목적 명확히 고지

## 기술 스택

### Frontend (Mobile)
- **React Native (Expo v53)** - 크로스 플랫폼 개발
- **TypeScript** - 주 개발 언어
- **TanStack Query** - 서버 상태 관리
- **Zustand** - 클라이언트 상태 관리 (Context 유지)
- **React Navigation v6** - 네비게이션
- **React Native Maps** - 구글맵 통합
- **Expo Location** - GPS 위치 서비스
- **Solana Mobile Wallet Adapter** - 블록체인 연동
- **Speech-to-Text/Text-to-Speech** - 음성 인터페이스

### Architecture Pattern
- **Feature-based Architecture** - 기능별 모듈화 구조
- **Clean Architecture principles** - 관심사 분리
- **Modern React Native Stack**: Expo Router + TanStack Query + Zustand

#### Context Preservation Strategy
AI 에이전트와의 대화 및 사용자 세션 간 컨텍스트 유지:
- **Zustand + AsyncStorage**: 사용자 선호도 및 대화 기록 영구 저장
- **Feature-별 Context Store**: 각 기능(맵, 보험, 채팅)별 상태 관리
- **Cross-Feature Communication**: 전역 이벤트 시스템으로 기능 간 통신
- **TanStack Query**: 서버 데이터 캐싱으로 오프라인에서도 컨텍스트 유지

### AI & Backend
- **Python (FastAPI)** - 백엔드 API
- **LangChain** - AI 에이전트 프레임워크
- **OpenAI GPT-4** - 대화형 AI
- **TensorFlow/PyTorch** - 위험도 분석 모델
- **Vector Database (Pinecone)** - 컨텍스트 저장

### Blockchain
- **Solana** - 메인 블록체인
- **Anchor Framework** - 스마트 컨트랙트
- **SPL Token** - 보험료 결제
- **Metaplex** - NFT 보험증서

### Infrastructure
- **AWS/Google Cloud** - 클라우드 인프라
- **Redis** - 실시간 세션 관리
- **PostgreSQL** - 사용자 데이터
- **WebSocket** - 실시간 통신

## 혁신 포인트

1. **GPS 기반 자동화**: 위치만으로 보험이 자동 시작/종료
2. **지오펜싱 보험**: 특정 지역 진입 시 자동 보험 활성화
3. **위치 인식 리스크**: GPS 기반 실시간 지역 위험도 분석
4. **여행 특화**: 공항 도착부터 귀국까지 완전 자동 관리
5. **마이크로 로케이션**: 건물, 행사장 단위의 정밀 보험

## 개발 로드맵

### Phase 1 (MVP) - Location Foundation
- [ ] GPS 기반 대화형 AI 에이전트
- [ ] 제주도 여행 보험 (파일럿)
- [ ] 기본 지오펜싱 기능
- [ ] Solana 지갑 연동

### Phase 2 (Expansion) - More Locations
- [ ] 국내 주요 관광지 확대
- [ ] 페스티벌/콘서트 보험 추가
- [ ] 등산/해양 스포츠 보험
- [ ] 실시간 위험도 지도

### Phase 3 (Global) - International
- [ ] 해외 여행 보험 지원
- [ ] 글로벌 위험도 데이터베이스
- [ ] 다국어 AI 에이전트
- [ ] 현지 의료기관 네트워크