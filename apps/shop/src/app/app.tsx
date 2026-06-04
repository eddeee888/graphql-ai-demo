import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Link } from './components/Link';

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

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql',
    headers: {
      'x-user-id': localStorage.getItem('x-user-id') || '',
    },
  }),
  cache: new InMemoryCache(),
});

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="text-white px-4 md:px-6 py-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-2 items-center">
          <Link href="/products" variant="secondary">
            <h1 className="text-2xl md:text-3xl">Shop Demo</h1>
          </Link>
          <div className="text-right">
            <Link href="/cart" variant="secondary">
              Go to cart
            </Link>
          </div>
        </div>
      </header>

      <ApolloProvider client={client}>
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
}

export default App;
