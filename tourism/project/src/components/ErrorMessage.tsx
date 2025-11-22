import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-2xl bg-red-50 border-2 border-red-200 rounded-2xl p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
        <div>
          <h3 className="text-lg font-semibold text-red-800 mb-1">Error</h3>
          <p className="text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );
}
