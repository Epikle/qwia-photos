import { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faImage } from '@fortawesome/free-solid-svg-icons';

import { Photo, URLS } from '../../shared/util/types';
import PhotoLikes from './PhotoLikes';
import PhotoView from './PhotoView';
import Button from '../../shared/components/Form/Button';

import styles from './PhotoItem.module.scss';

type Props = {
  aid: string;
  photo: Photo;
};

const PhotoItem: React.FC<Props> = ({ aid, photo }) => {
  const { id, title, url, likes } = photo;
  const [isView, setIsView] = useState(false);

  const viewBtnHandler = () => {
    setIsView((prevState) => !prevState);
  };

  return (
    <Fragment>
      {isView && (
        <PhotoView onClick={viewBtnHandler}>
          <img src={`${URLS.awsUrl}/${url}`} alt={title} />
        </PhotoView>
      )}
      <article className={styles.photo}>
        <div className={styles['photo__img-container']}>
          {(!url || !URLS.awsUrl) && <FontAwesomeIcon icon={faImage} />}
          {url && URLS.awsUrl && (
            <Fragment>
              <img
                className={styles.photo__img}
                src={`${URLS.awsUrl}/${url}`}
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

          <PhotoLikes pid={id} aid={aid} likes={likes} />
        </div>
      </article>
    </Fragment>
  );
};

export default PhotoItem;
