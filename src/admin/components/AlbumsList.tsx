import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

import { Album } from '../../shared/util/types';
import { getAllAlbums } from '../../shared/util/fetch';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

const AlbumsList: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    isLoading,
    isError,
    data: albums,
    error,
  } = useQuery<Album[], Error>(['albumsData'], async () => {
    const accessToken = await getAccessTokenSilently();
    const albums = await getAllAlbums(accessToken);
    return albums;
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Fragment>
      {(!albums || albums.length === 0) && <p>No albums...</p>}
      {albums && (
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              <Link to={`/admin/${album.id}`}>{album.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default AlbumsList;
