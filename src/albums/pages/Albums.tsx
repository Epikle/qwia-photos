import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Album } from '../../shared/util/types';
import { getVisibleAlbums } from '../../shared/util/fetch';
import AlbumList from '../components/AlbumList';

const Albums: React.FC = () => {
  document.title = `qwiaPHOTOS`;

  const {
    isLoading,
    isError,
    data: albums,
    error,
  } = useQuery<Album[], Error>(['albumsData'], async () => {
    const albums = await getVisibleAlbums();
    return albums;
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Fragment>
      {(!albums || albums.length === 0) && <p>No albums...</p>}
      {albums && <AlbumList albums={albums} />}
    </Fragment>
  );
};

export default Albums;
