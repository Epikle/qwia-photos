import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import styles from './AlbumHeader.module.scss';

const AlbumHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className={styles['album-header-container']}>
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
      <ul className={styles.breadcrumb__list}>
        <li className={styles['breadcrumb__list-item']}>
          <Link to="/" className={styles['breadcrumb__list-link']}>
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </li>
        <li
          className={[
            styles['breadcrumb__list-item'],
            styles['breadcrumb__list-item--current'],
          ].join(' ')}
        >
          <span aria-current="page">{title}</span>
        </li>
      </ul>
    </nav>
  </div>
);

export default AlbumHeader;
