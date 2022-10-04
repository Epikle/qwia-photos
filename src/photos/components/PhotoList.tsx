import { Photo } from '../../shared/util/types';
import PhotoItem from './PhotoItem';

import styles from './PhotoList.module.scss';

type Props = {
  aid: string;
  photos: Photo[];
};

const PhotoList: React.FC<Props> = ({ aid, photos }) => (
  <div className={styles.photos}>
    {photos.length === 0 && <p>No photos found!</p>}
    {photos.length > 0 &&
      photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} aid={aid} />
      ))}
  </div>
);

export default PhotoList;
