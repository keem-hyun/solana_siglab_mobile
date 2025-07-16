import { create } from 'zustand';
import { MapState } from '../types';

const SOLANA_HQ_LOCATION = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const useMapStore = create<MapState>((set) => ({
  currentLocation: SOLANA_HQ_LOCATION,
  searchQuery: '',
  searchResults: [],
  showResults: false,
  selectedMarker: null,

  setCurrentLocation: (location) => set({ currentLocation: location }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSearchResults: (results) => set({ searchResults: results }),
  
  setShowResults: (show) => set({ showResults: show }),
  
  setSelectedMarker: (marker) => set({ selectedMarker: marker }),
  
  clearSearch: () => set({ 
    searchQuery: '', 
    searchResults: [], 
    showResults: false 
  }),
}));