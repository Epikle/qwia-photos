import { Fragment } from 'react';

import AlbumsList from '../components/AlbumsList';

import Header from '../components/Header';
import NewAlbum from '../components/NewAlbum';

const Admin: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <AlbumsList />
        <NewAlbum />
      </main>
    </Fragment>
  );
};

export default Admin;
