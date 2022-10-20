import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import { Album, URLS } from '../../shared/util/types';

import styles from './AlbumItem.module.scss';

const AlbumItem: React.FC<{ album: Album }> = ({ album }) => {
  const { id, title, thumbnail } = album;

  if (thumbnail === null) return null;

  return (
    <article className={styles.album}>
      <Link to={`/album/${id}`}>
        <div className={styles['album__img-container']}>
          {(!thumbnail.url || !URLS.awsCloudUrl) && (
            <FontAwesomeIcon icon={faImage} />
          )}
          {thumbnail.url && URLS.awsCloudUrl && (
            <img
              className={styles.album__img}
              src={URLS.awsCloudUrl + '/fit-in/420x280/' + thumbnail.url}
              alt={title}
            />
          )}
        </div>

        <div className={styles.album__info}>
          <h2 className={styles.album__title}>{title}</h2>
        </div>
      </Link>
    </article>
  );
};

export default AlbumItem;
