import { type Album } from '../../shared/util/types';
import AlbumItem from './AlbumItem';

import styles from './AlbumList.module.scss';

const AlbumList: React.FC<{ albums: Album[] }> = ({ albums }) => (
  <div className={styles.albums}>
    {albums.map((album) => (
      <AlbumItem key={album.id} album={album} />
    ))}
  </div>
);

export default AlbumList;
