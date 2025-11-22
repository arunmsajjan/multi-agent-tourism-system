import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-4 py-12">
      <Loader2 className="animate-spin text-blue-500" size={48} />
      <div className="space-y-2 text-center">
        <p className="text-xl font-semibold text-gray-700">Searching destination...</p>
        <p className="text-sm text-gray-500">Gathering weather and attractions data</p>
      </div>
    </div>
  );
}
