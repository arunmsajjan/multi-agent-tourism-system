import { Cloud, Wind, Thermometer } from 'lucide-react';
import { WeatherData } from '../agents/weatherAgent';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <Cloud className="text-blue-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">Current Weather</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Thermometer className="text-red-400" size={24} />
          <div>
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="text-3xl font-bold text-gray-800">{weather.temperature}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Wind className="text-blue-400" size={24} />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="text-xl font-semibold text-gray-800">{weather.windSpeed} km/h</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <p className="text-lg font-medium text-blue-900">{weather.description}</p>
        </div>
      </div>
    </div>
  );
}
