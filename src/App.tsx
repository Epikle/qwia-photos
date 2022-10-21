import React, { Fragment, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoadingSpinner from './shared/components/UI/LoadingSpinner';
const ProtectedRoute = React.lazy(
  () => import('./admin/components/ProtectedRoute'),
);
const Header = React.lazy(() => import('./shared/components/UI/Header'));
const Footer = React.lazy(() => import('./shared/components/UI/Footer'));
const Album = React.lazy(() => import('./albums/pages/Album'));
const Admin = React.lazy(() => import('./admin/pages/Admin'));
const Albums = React.lazy(() => import('./albums/pages/Albums'));
const Photos = React.lazy(() => import('./admin/pages/Photos'));

const Layout: React.FC<{ component: React.FC }> = ({
  component: Component,
}) => (
  <Fragment>
    <Header />
    <main>
      <div className="container">
        <Component />
      </div>
    </main>
    <Footer />
  </Fragment>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route index element={<Layout component={Albums} />} />
          <Route path="/album/:aid" element={<Layout component={Album} />} />
          <Route path="admin" element={<ProtectedRoute component={Admin} />}>
            <Route index element={<h2>Statistics</h2>} />
            <Route path=":aid" element={<Photos />} />
          </Route>
          <Route path="*" element={<Layout component={Albums} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
