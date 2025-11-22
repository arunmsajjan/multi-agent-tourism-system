import { MapPinned, Globe } from 'lucide-react';
import { GeocodingResult } from '../utils/geocoding';

interface LocationHeaderProps {
  location: GeocodingResult;
}

export function LocationHeader({ location }: LocationHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
      <div className="flex items-center gap-3 mb-2">
        <MapPinned size={32} />
        <h1 className="text-3xl font-bold">{location.name}</h1>
      </div>
      <div className="flex items-center gap-2 text-blue-100">
        <Globe size={18} />
        <p className="text-lg">{location.displayName}</p>
      </div>
      <div className="mt-3 flex gap-4 text-sm text-blue-100">
        <span>Latitude: {location.latitude.toFixed(4)}</span>
        <span>Longitude: {location.longitude.toFixed(4)}</span>
      </div>
    </div>
  );
}
