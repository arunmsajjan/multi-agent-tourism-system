import { useState } from 'react';
import { Plane, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TourismAgent, TourismResult } from '../agents/tourismAgent';
import { SearchInput } from '../components/SearchInput';
import { LocationHeader } from '../components/LocationHeader';
import { WeatherCard } from '../components/WeatherCard';
import { AttractionsCard } from '../components/AttractionsCard';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<TourismResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { user, signOut } = useAuth();
  const tourismAgent = new TourismAgent();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    const response = await tourismAgent.searchDestination(searchQuery);

    setIsLoading(false);

    if ('error' in response) {
      setError(response.error);
    } else {
      setResult(response);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="text-blue-500" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">Tourism AI Agent</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, <span className="font-semibold text-gray-800">{user?.email}</span></span>
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSigningOut && <Loader2 className="animate-spin" size={18} />}
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Discover Your Next Adventure</h2>
          <p className="text-xl text-gray-600">
            Explore destinations with real-time weather and attractions
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            isLoading={isLoading}
          />

          {isLoading && <LoadingSpinner />}

          {error && <ErrorMessage message={error} />}

          {result && (
            <div className="w-full max-w-6xl space-y-6">
              <LocationHeader location={result.location} />

              <div className="grid md:grid-cols-2 gap-6">
                <WeatherCard weather={result.weather} />
                <AttractionsCard
                  attractions={result.attractions}
                  locationName={result.location.name}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
