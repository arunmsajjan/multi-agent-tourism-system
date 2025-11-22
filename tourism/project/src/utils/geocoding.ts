export interface GeocodingResult {
  name: string;
  displayName: string;
  latitude: number;
  longitude: number;
  country: string;
}

export async function geocodePlace(placeName: string): Promise<GeocodingResult | null> {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&limit=1`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'TourismAgentApp/1.0'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to geocode place');
  }

  const data = await response.json();

  if (data.length === 0) {
    return null;
  }

  const result = data[0];

  return {
    name: result.name,
    displayName: result.display_name,
    latitude: parseFloat(result.lat),
    longitude: parseFloat(result.lon),
    country: result.display_name.split(',').slice(-1)[0].trim()
  };
}
