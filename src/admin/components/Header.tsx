import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '../../shared/components/Form/Button';
import { URLS } from '../../shared/util/types';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { logout, user } = useAuth0();

  return (
    <header className={styles.header}>
      <Link to="/admin">
        {' '}
        <h1>qwiaPHOTOS</h1>
      </Link>
      <div>
        {user?.name},{' '}
        <Button
          onClick={() => {
            logout({ returnTo: URLS.pageUrl });
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
