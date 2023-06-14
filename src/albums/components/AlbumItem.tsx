import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import { type Album, URLS } from '../../shared/util/types';

import styles from './AlbumItem.module.scss';

const AlbumItem: React.FC<{ album: Album }> = ({ album }) => {
  const { id, title, thumbnail } = album;

  if (thumbnail === null) return null;

  return (
    <article className={styles.album}>
      <Link to={`/album/${id}`}>
        <figure>
          {(!thumbnail.url || !URLS.awsCloudUrl) && (
            <FontAwesomeIcon icon={faImage} />
          )}
          {thumbnail.url && URLS.awsCloudUrl && (
            <img
              src={URLS.awsCloudUrl + '/fit-in/420x280/' + thumbnail.url}
              alt={title}
            />
          )}
          <figcaption>{title}</figcaption>
        </figure>
      </Link>
    </article>
  );
};

export default AlbumItem;
