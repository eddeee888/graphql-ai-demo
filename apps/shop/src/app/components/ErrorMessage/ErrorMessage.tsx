import { Button } from '../Button';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  message = 'An error occurred. Please try again.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-52 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <p className="text-lg text-red-400 mb-6 max-w-sm">{message}</p>
      {onRetry && <Button onClick={onRetry}>Try Again</Button>}
    </div>
  );
}
