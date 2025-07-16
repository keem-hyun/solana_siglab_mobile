import { Place } from '../types';

// Google API Key from environment variable
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY || '';

interface GeocodingResult {
  place_id: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
}

export const searchPlaces = async (query: string): Promise<Place[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    // Use Google Geocoding API for place search
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&language=ko`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results) {
      // Transform geocoding results to our Place format
      return data.results.slice(0, 5).map((result: GeocodingResult) => ({
        place_id: result.place_id,
        name: result.address_components[0]?.long_name || query,
        formatted_address: result.formatted_address,
        geometry: {
          location: {
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
          }
        }
      }));
    } else if (data.status === 'ZERO_RESULTS') {
      return [];
    } else {
      console.error('Geocoding API error:', data.status, data.error_message);
      return [];
    }
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};