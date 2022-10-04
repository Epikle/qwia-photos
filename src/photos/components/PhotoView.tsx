import React, { Fragment, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import PhotoViewBackdrop from './PhotoViewBackdrop';
import Button from '../../shared/components/Form/Button';

import styles from './PhotoView.module.scss';

type Props = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
};

const PhotoView: React.FC<Props> = ({ onClick, children }) => {
  const photoView = document.getElementById('photoview');

  const content = (
    <Fragment>
      <PhotoViewBackdrop onClick={onClick} />
      <div className={styles.photoview}>
        <div className={styles['photoview-content']}>{children}</div>
        <div>
          <Button
            className={[styles['photoview-btn']]}
            onClick={onClick}
            ariaLabel="Close"
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </div>
      </div>
    </Fragment>
  );

  return photoView ? ReactDOM.createPortal(content, photoView) : null;
};

export default PhotoView;
