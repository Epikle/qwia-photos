import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

import Button from '../../shared/components/Form/Button';
import { URLS } from '../../shared/util/types';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { logout, user } = useAuth0();

  return (
    <header className={styles.header}>
      <Link to={'/admin'}>
        <h1>
          qwia<strong>PHOTOS</strong>
        </h1>
      </Link>
      <div>
        {user?.name}
        <Button
          onClick={() => {
            logout({ logoutParams: { returnTo: URLS.pageUrl } });
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
