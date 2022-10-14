import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Album as AlbumType } from '../../shared/util/types';
import { getAlbumById } from '../../shared/util/fetch';
import PhotoItem from '../components/PhotoItem';
import NewPhoto from '../components/NewPhoto';
import Header from '../components/Header';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

const Photos: React.FC = () => {
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

  return (
    <Fragment>
      <Header />
      <main>
        {album && (
          <Fragment>
            {album.title}
            {album.photos.map((photo) => (
              <PhotoItem key={photo.id} photo={photo} aid={aid} />
            ))}
          </Fragment>
        )}
        <NewPhoto aid={aid} />
      </main>
    </Fragment>
  );
};

export default Photos;
