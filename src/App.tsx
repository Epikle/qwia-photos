import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './admin/components/ProtectedRoute';
import Header from './shared/components/UI/Header';
import Footer from './shared/components/UI/Footer';
import Album from './albums/pages/Album';
import Admin from './admin/pages/Admin';
import Albums from './albums/pages/Albums';
import Photos from './admin/pages/Photos';

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
      <Routes>
        <Route path="/" element={<Layout component={Albums} />} />
        <Route path="/album/:aid" element={<Layout component={Album} />} />
        <Route path="/admin" element={<ProtectedRoute component={Admin} />} />
        <Route
          path="/admin/:aid"
          element={<ProtectedRoute component={Photos} />}
        />
        <Route path="*" element={<Layout component={Albums} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
