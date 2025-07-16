export interface Location {
  latitude: number;
  longitude: number;
}

export interface Region extends Location {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}