import { MapPin, Compass } from 'lucide-react';
import { TouristAttraction } from '../agents/placesAgent';

interface AttractionsCardProps {
  attractions: TouristAttraction[];
  locationName: string;
}

export function AttractionsCard({ attractions, locationName }: AttractionsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <Compass className="text-green-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">Top Attractions</h2>
      </div>

      {attractions.length === 0 ? (
        <p className="text-gray-600">No tourist attractions found nearby.</p>
      ) : (
        <div className="space-y-3">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-100 rounded-xl hover:border-green-300 transition-colors"
            >
              <div className="flex items-start gap-3">
                <MapPin className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">{attraction.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{attraction.type}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {attraction.latitude.toFixed(4)}, {attraction.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
