import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Album as AlbumType } from '../../shared/util/types';
import PhotoItem from '../components/PhotoItem';
import NewPhoto from '../components/NewPhoto';

const Photos: React.FC = () => {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    data: album,
    error,
  } = useQuery<AlbumType, Error>(['albumData', id], async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/api/v2/qwia-photos/album/${id}`,
    );

    if (!response.ok) {
      throw new Error('Something went wrong...');
    }

    return response.json();
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!id) return null;

  return (
    <Fragment>
      <Link to="/admin">Home</Link>
      {album && (
        <Fragment>
          {album.title}
          {album.photos.map((photo) => (
            <PhotoItem key={photo.id} photo={photo} albumId={id} />
          ))}
        </Fragment>
      )}
      <NewPhoto albumId={id} />
    </Fragment>
  );
};

export default Photos;
