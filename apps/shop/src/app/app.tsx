import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoadingSpinner } from '@org/shop-shared-ui';
import './app.css';
import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

// Lazy load feature components
const ProductList = lazy(() =>
  import('./routes/ProductList').then((m) => ({ default: m.ProductList })),
);
const ProductDetail = lazy(() =>
  import('./routes/ProductDetail').then((m) => ({
    default: m.ProductDetail,
  })),
);

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache(),
});

export function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Nx Shop Demo</h1>
        </div>
      </header>

      <ApolloProvider client={client}>
        <main className="app-main">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="*" element={<Navigate to="/products" replace />} />
            </Routes>
          </Suspense>
        </main>
      </ApolloProvider>
    </div>
  );
}

export default App;
