import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  FAB, 
  useTheme, 
  Chip,
  Portal,
  Modal,
  List
} from 'react-native-paper';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

interface GeofenceArea {
  id: string;
  name: string;
  type: 'travel' | 'event' | 'activity';
  coordinates: { latitude: number; longitude: number; radius: number };
  active: boolean;
  insuranceType?: string;
}

interface NearbyPOI {
  id: string;
  name: string;
  type: 'hospital' | 'police' | 'event' | 'tourist';
  distance: string;
  icon: string;
}

export default function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
  });
  const [geofences, setGeofences] = useState<GeofenceArea[]>([
    {
      id: '1',
      name: '제주공항',
      type: 'travel',
      coordinates: { latitude: 33.5066, longitude: 126.4919, radius: 1000 },
      active: true,
      insuranceType: '제주도 여행 보험',
    },
  ]);
  const [nearbyPOIs, setNearbyPOIs] = useState<NearbyPOI[]>([
    { id: '1', name: '서울대학교병원', type: 'hospital', distance: '0.8km', icon: 'hospital' },
    { id: '2', name: '종로경찰서', type: 'police', distance: '1.2km', icon: 'shield' },
    { id: '3', name: '경복궁', type: 'tourist', distance: '0.5km', icon: 'castle' },
  ]);
  const [mapVisible, setMapVisible] = useState(false);
  const theme = useTheme();

  const handleCreateGeofence = () => {
    // 지오펜스 생성 로직
  };

  const handleLocationShare = () => {
    // 위치 공유 로직
  };

  return (
    <View style={styles.container}>
      {/* 지도 플레이스홀더 */}
      <Card style={styles.mapCard}>
        <Card.Content style={styles.mapContent}>
          <View style={[styles.mapPlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}>
            <MaterialCommunityIcon 
              name="map" 
              size={80} 
              color={theme.colors.onSurfaceVariant} 
            />
            <Text variant="bodyLarge" style={{ marginTop: 10 }}>
              지도 로딩 중...
            </Text>
            <Text variant="bodySmall" style={{ textAlign: 'center', marginTop: 5 }}>
              GPS 기반 보험 지역을 표시합니다
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* 현재 위치 정보 */}
      <Card style={styles.locationInfoCard}>
        <Card.Content>
          <View style={styles.locationHeader}>
            <MaterialCommunityIcon 
              name="crosshairs-gps" 
              size={24} 
              color={theme.colors.primary} 
            />
            <Text variant="titleMedium" style={{ marginLeft: 8 }}>
              현재 위치
            </Text>
          </View>
          <Text variant="bodyMedium">서울시 종로구 세종대로</Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            정확도: 5m • 마지막 업데이트: 방금 전
          </Text>
        </Card.Content>
      </Card>

      {/* 활성 지오펜스 */}
      {geofences.filter(g => g.active).length > 0 && (
        <Card style={styles.geofenceCard}>
          <Card.Content>
            <View style={styles.geofenceHeader}>
              <MaterialCommunityIcon 
                name="vector-polygon" 
                size={24} 
                color={theme.colors.secondary} 
              />
              <Text variant="titleMedium" style={{ marginLeft: 8 }}>
                활성 보험 지역
              </Text>
            </View>
            {geofences.filter(g => g.active).map((geofence) => (
              <Chip
                key={geofence.id}
                icon="shield-check"
                style={[styles.geofenceChip, { backgroundColor: theme.colors.secondaryContainer }]}
              >
                {geofence.name} - {geofence.insuranceType}
              </Chip>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* 주변 시설 정보 */}
      <Card style={styles.poiCard}>
        <Card.Content>
          <View style={styles.poiHeader}>
            <MaterialCommunityIcon 
              name="map-marker-multiple" 
              size={24} 
              color={theme.colors.tertiary} 
            />
            <Text variant="titleMedium" style={{ marginLeft: 8 }}>
              주변 중요 시설
            </Text>
          </View>
          {nearbyPOIs.map((poi) => (
            <List.Item
              key={poi.id}
              title={poi.name}
              description={poi.distance}
              left={props => (
                <List.Icon {...props} icon={poi.icon} />
              )}
              style={styles.poiItem}
            />
          ))}
        </Card.Content>
      </Card>

      {/* 플로팅 액션 버튼들 */}
      <FAB.Group
        open={mapVisible}
        visible
        icon={mapVisible ? 'close' : 'plus'}
        actions={[
          {
            icon: 'shield-plus',
            label: '보험 지역 생성',
            onPress: handleCreateGeofence,
          },
          {
            icon: 'share-variant',
            label: '위치 공유',
            onPress: handleLocationShare,
          },
          {
            icon: 'crosshairs-gps',
            label: '내 위치로',
            onPress: () => {
              // 현재 위치로 이동
            },
          },
        ]}
        onStateChange={({ open }) => setMapVisible(open)}
        onPress={() => {
          if (mapVisible) {
            // 메인 FAB 클릭 시 동작
          }
        }}
      />

      {/* 위험도 표시 */}
      <Card style={[styles.riskCard, { backgroundColor: theme.colors.errorContainer }]}>
        <Card.Content style={styles.riskContent}>
          <MaterialCommunityIcon 
            name="alert-circle" 
            size={20} 
            color={theme.colors.onErrorContainer} 
          />
          <Text 
            variant="bodySmall" 
            style={{ 
              marginLeft: 8, 
              color: theme.colors.onErrorContainer 
            }}
          >
            이 지역은 위험도가 중간입니다
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  mapCard: {
    height: height * 0.4,
    marginBottom: 10,
    elevation: 4,
  },
  mapContent: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  locationInfoCard: {
    marginBottom: 10,
    elevation: 2,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  geofenceCard: {
    marginBottom: 10,
    elevation: 2,
  },
  geofenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  geofenceChip: {
    marginRight: 8,
    marginBottom: 5,
  },
  poiCard: {
    flex: 1,
    elevation: 2,
  },
  poiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  poiItem: {
    paddingHorizontal: 0,
  },
  riskCard: {
    position: 'absolute',
    top: 10,
    right: 10,
    elevation: 6,
  },
  riskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});