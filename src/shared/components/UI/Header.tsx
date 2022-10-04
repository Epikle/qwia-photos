import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <h1>
        <Link to="/">
          qwia<strong>PHOTOS</strong>
        </Link>
      </h1>
    </div>
  </header>
);

export default Header;
