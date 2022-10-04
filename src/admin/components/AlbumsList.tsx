import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

import { Album } from '../../shared/util/types';
import AlbumItem from './AlbumItem';
import { fetchAllAlbums } from '../util/fetch';

const AlbumsList: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();

  const {
    isLoading,
    isError,
    data: albums,
    error,
  } = useQuery<Album[], Error>(['albumsData'], async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetchAllAlbums(accessToken);
    return response;
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Fragment>
      {(!albums || albums.length === 0) && <p>No albums...</p>}
      {albums && (
        <div>
          {albums.map((album) => (
            <AlbumItem
              key={album.id}
              id={album.id}
              title={album.title}
              isPublished={album.isPublished}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default AlbumsList;
