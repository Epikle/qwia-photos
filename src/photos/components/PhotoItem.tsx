import { Fragment, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faImage } from '@fortawesome/free-solid-svg-icons';

import { Photo } from '../../shared/util/types';

import PhotoLikes from './PhotoLikes';
import PhotoView from './PhotoView';
import Button from '../../shared/components/Form/Button';

import styles from './PhotoItem.module.scss';

type Props = {
  photo: Photo;
  albumId: string;
};

const PhotoItem: React.FC<Props> = ({ photo, albumId }) => {
  const { id, title, url, likes } = photo;
  const [isView, setIsView] = useState(false);

  const viewBtnHandler = () => {
    setIsView((prevState) => !prevState);
  };

  return (
    <Fragment>
      {isView && (
        <PhotoView onClick={viewBtnHandler}>
          <img src={`${import.meta.env.VITE_APP_AWS_URL}/${url}`} alt={title} />
        </PhotoView>
      )}
      <article className={styles.photo}>
        <div className={styles['photo__img-container']}>
          {(!url || !import.meta.env.VITE_APP_AWS_URL) && (
            <FontAwesomeIcon icon={faImage} />
          )}
          {url && import.meta.env.VITE_APP_AWS_URL && (
            <Fragment>
              <img
                className={styles.photo__img}
                src={`${import.meta.env.VITE_APP_AWS_URL}/${url}`}
                alt={title}
              />
              <div className={styles['photo__img-overlay']}>
                <Button
                  onClick={viewBtnHandler}
                  className={[styles['photo__img-overlay-btn']]}
                  ariaLabel="Preview photo"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
              </div>
            </Fragment>
          )}
        </div>
        <div className={styles.photo__info}>
          <h3 className={styles.photo__title}>
            <abbr title={title}>{title}</abbr>
          </h3>

          <PhotoLikes imgId={id} likes={likes} albumId={albumId} />
        </div>
      </article>
    </Fragment>
  );
};

export default PhotoItem;
