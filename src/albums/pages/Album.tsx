import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import PhotoList from '../../photos/components/PhotoList';
import { Album as AlbumType } from '../../shared/util/types';
import { getAlbumById } from '../../shared/util/fetch';
import AlbumHeader from '../components/AlbumHeader';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

const Album: React.FC = () => {
  const { aid } = useParams();

  if (!aid) return null;

  const {
    isLoading,
    isError,
    data: album,
    error,
  } = useQuery<AlbumType, Error>(
    ['albumData', aid],
    getAlbumById.bind(null, aid),
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error: {error.message}</p>;

  document.title = `qwiaPHOTOS | ${album.title}`;

  return (
    <Fragment>
      <AlbumHeader title={album.title} />
      <PhotoList photos={album.photos} aid={album.id} />
    </Fragment>
  );
};

export default Album;
