import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './app.css';
import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { LoadingSpinner } from './components/LoadingSpinner';

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
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <a href="/products">Shop Demo</a>
          </h1>
          <a href="/cart">Go to cart</a>
        </div>
      </header>

      <ApolloProvider client={client}>
        <main className="app-main">
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
