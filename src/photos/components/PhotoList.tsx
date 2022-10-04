import { Photo } from '../../shared/util/types';
import PhotoItem from './PhotoItem';

import styles from './PhotoList.module.scss';

type Props = {
  photos: Photo[];
  albumId: string;
};

const PhotoList: React.FC<Props> = ({ photos, albumId }) => (
  <div className={styles.photos}>
    {photos.length === 0 && <p>No photos found!</p>}
    {photos.length > 0 &&
      photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} albumId={albumId} />
      ))}
  </div>
);

export default PhotoList;
