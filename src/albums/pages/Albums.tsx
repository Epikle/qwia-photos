import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Album } from '../../shared/util/types';

import AlbumList from '../components/AlbumList';

const Albums: React.FC = () => {
  document.title = `qwiaPHOTOS`;

  const {
    isLoading,
    isError,
    data: albums,
    error,
  } = useQuery<Album[], Error>(['albumsData'], async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/api/v2/qwia-photos/album`,
    );

    if (!response.ok) {
      throw new Error('Something went wrong...');
    }

    return response.json();
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
