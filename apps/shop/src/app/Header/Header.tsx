import { useSubscription } from '@apollo/client/react';
import { Link } from '../components/Link';
import { CartUpdatesDoc } from './Header.graphql';
import { useCallback, useEffect, useState } from 'react';

export const Header: React.FC = () => {
  const { data } = useSubscription(CartUpdatesDoc);
  const { toasts, add } = useToast();

  useEffect(() => {
    if (data?.cartUpdates.update) {
      add(data.cartUpdates.update);
    }
  }, [data, add]);

  return (
    <>
      <header className="text-white px-4 md:px-6 py-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-2 items-center">
          <Link href="/products" variant="secondary">
            <h1 className="text-2xl md:text-3xl">Shop Demo</h1>
          </Link>
          <div className="text-right">
            <Link href="/cart" variant="secondary">
              Go to cart
            </Link>
            &nbsp; | &nbsp;
            <Link href="/agent-chat" variant="secondary">
              Agent chat
            </Link>
          </div>
        </div>
      </header>
      <ToastContainer toasts={toasts} />
    </>
  );
};

interface Toast {
  id: string;
  title: string;
}

const useToast = (): { toasts: Toast[]; add: (title: string) => void } => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = useCallback((title: string) => {
    const id = globalThis.crypto.randomUUID();
    setToasts((prev) => [...prev, { id, title }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      5000,
    );
  }, []);

  return { toasts, add };
};

const ToastContainer: React.FC<{ toasts: Toast[] }> = ({ toasts }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          aria-live="polite"
          className="
            flex items-start gap-3 rounded-lg border border-l-4
            border-gray-200 border-l-green-500
            px-4 py-3 shadow-md
            bg-white
          "
        >
          <i className="text-lg mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{toast.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
