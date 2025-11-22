export interface TouristAttraction {
  name: string;
  type: string;
  latitude: number;
  longitude: number;
}

export async function getTouristAttractions(
  latitude: number,
  longitude: number,
  placeName: string
): Promise<TouristAttraction[]> {
  const radius = 10000;

  const query = `
    [out:json];
    (
      node["tourism"](around:${radius},${latitude},${longitude});
      way["tourism"](around:${radius},${latitude},${longitude});
      node["historic"](around:${radius},${latitude},${longitude});
      way["historic"](around:${radius},${latitude},${longitude});
      node["leisure"="park"](around:${radius},${latitude},${longitude});
      way["leisure"="park"](around:${radius},${latitude},${longitude});
    );
    out center 20;
  `;

  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `data=${encodeURIComponent(query)}`
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tourist attractions');
  }

  const data = await response.json();

  const attractions: TouristAttraction[] = data.elements
    .filter((element: { tags?: { name?: string } }) => element.tags?.name)
    .map((element: {
      tags: { name: string; tourism?: string; historic?: string; leisure?: string };
      lat?: number;
      lon?: number;
      center?: { lat: number; lon: number };
    }) => {
      const type = element.tags.tourism || element.tags.historic || element.tags.leisure || 'attraction';
      const lat = element.lat || element.center?.lat || 0;
      const lon = element.lon || element.center?.lon || 0;

      return {
        name: element.tags.name,
        type: type.replace(/_/g, ' '),
        latitude: lat,
        longitude: lon
      };
    })
    .slice(0, 5);

  return attractions;
}
