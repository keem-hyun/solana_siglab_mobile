export interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface MapLocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface Marker {
  latitude: number;
  longitude: number;
  title: string;
}

export interface MapState {
  currentLocation: MapLocation;
  searchQuery: string;
  searchResults: Place[];
  showResults: boolean;
  selectedMarker: Marker | null;
  setCurrentLocation: (location: MapLocation) => void;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Place[]) => void;
  setShowResults: (show: boolean) => void;
  setSelectedMarker: (marker: Marker | null) => void;
  clearSearch: () => void;
}