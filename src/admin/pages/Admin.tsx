import { Fragment } from 'react';

import AlbumsList from '../components/AlbumsList';
import Header from '../components/Header';
import NewAlbum from '../components/NewAlbum';

import styles from './Admin.module.scss';

const Admin: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <div className={styles.wrapper}>
        <aside className={styles.menu}>
          <AlbumsList />
          <NewAlbum />
        </aside>
        <main className={styles.main}>
          <h2>Statistics</h2>
        </main>
      </div>
    </Fragment>
  );
};

export default Admin;
