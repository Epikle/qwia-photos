import { Fragment, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Button from '../../shared/components/Form/Button';

import styles from './PhotoView.module.scss';

type Props = {
  onClick: () => void;
  children?: ReactNode;
};

const PhotoView: React.FC<Props> = ({ onClick, children }) => {
  const photoView = document.getElementById('photoview');

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const content = (
    <Fragment>
      <div className={styles.photoview}>
        <div className={styles.container}>
          <div className={styles['photoview-title']}>
            <Button
              className={[styles['photoview-btn']]}
              onClick={onClick}
              ariaLabel="Close"
            >
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
          <div className={styles['photoview-content']}>{children}</div>
        </div>
      </div>
    </Fragment>
  );

  return photoView ? ReactDOM.createPortal(content, photoView) : null;
};

export default PhotoView;
