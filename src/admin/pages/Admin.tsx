import { useAuth0 } from '@auth0/auth0-react';

import AlbumsList from '../components/AlbumsList';
import Button from '../../shared/components/Form/Button';
import NewAlbum from '../components/NewAlbum';

const Admin: React.FC = () => {
  const { logout, user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <div>
      Hello {user.name},{' '}
      <Button
        onClick={() => {
          logout({ returnTo: import.meta.env.VITE_APP_PAGE_URL || '' });
        }}
      >
        Logout
      </Button>{' '}
      <AlbumsList />
      <NewAlbum />
    </div>
  );
};

export default Admin;
