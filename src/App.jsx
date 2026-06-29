import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const Premium = lazy(() => import('./pages/Premium'));
const Docs = lazy(() => import('./pages/Docs'));

function RouteFallback() {
  return <div className="min-h-screen bg-[#050505]" aria-hidden="true" />;
}

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
