import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import PhotoList from '../../photos/components/PhotoList';
import { Album as AlbumType } from '../../shared/util/types';
import AlbumHeader from '../components/AlbumHeader';

const Album: React.FC = () => {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    data: album,
    error,
  } = useQuery<AlbumType, Error>(['albumData', id], async () => {
    const getVisitorId = localStorage.getItem('qp-id');
    const response = await fetch(
      `${
        import.meta.env.VITE_APP_API_URL
      }/api/v2/qwia-photos/album/${id}?lid=${getVisitorId}`,
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
      {album && (
        <Fragment>
          <AlbumHeader title={album.title} />
          <PhotoList photos={album.photos} albumId={album.id} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Album;
