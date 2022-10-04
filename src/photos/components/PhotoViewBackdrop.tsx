import React from 'react';
import ReactDOM from 'react-dom';
import styles from './PhotoViewBackdrop.module.scss';

type Props = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

const PhotoViewBackdrop: React.FC<Props> = ({ onClick }) => {
  const backdrop = document.getElementById('photoviewbackdrop');

  return backdrop
    ? ReactDOM.createPortal(
        <div
          className={styles.backdrop}
          onClick={onClick}
          role="presentation"
        />,
        backdrop,
      )
    : null;
};

export default PhotoViewBackdrop;
