import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Header } from './Header';
import { createApolloClient } from './createApolloClient';

// Lazy load feature components
const ProductList = lazy(() =>
  import('./routes/ProductList').then((m) => ({ default: m.ProductList })),
);
const ProductDetail = lazy(() =>
  import('./routes/ProductDetail').then((m) => ({
    default: m.ProductDetail,
  })),
);
const Cart = lazy(() =>
  import('./routes/Cart').then((m) => ({ default: m.Cart })),
);

const client = createApolloClient();

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ApolloProvider client={client}>
        <Header />
        <main className="flex-1">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<Navigate to="/products" replace />} />
            </Routes>
          </Suspense>
        </main>
      </ApolloProvider>
    </div>
  );
};

export default App;
