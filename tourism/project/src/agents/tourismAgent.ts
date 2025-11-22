import { geocodePlace, GeocodingResult } from '../utils/geocoding';
import { getWeather, WeatherData } from './weatherAgent';
import { getTouristAttractions, TouristAttraction } from './placesAgent';

export interface TourismResult {
  location: GeocodingResult;
  weather: WeatherData;
  attractions: TouristAttraction[];
  error?: string;
}

export class TourismAgent {
  async searchDestination(placeName: string): Promise<TourismResult | { error: string }> {
    try {
      const location = await geocodePlace(placeName);

      if (!location) {
        return {
          error: `I don't know if the place "${placeName}" exists. Please check the spelling or try a different location.`
        };
      }

      const [weather, attractions] = await Promise.all([
        getWeather(location.latitude, location.longitude),
        getTouristAttractions(location.latitude, location.longitude, placeName)
      ]);

      return {
        location,
        weather,
        attractions
      };
    } catch (error) {
      return {
        error: `An error occurred while searching for "${placeName}". Please try again.`
      };
    }
  }
}
