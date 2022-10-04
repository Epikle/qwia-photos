import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Album as AlbumType } from '../../shared/util/types';
import { getAlbumById } from '../../shared/util/fetch';
import PhotoItem from '../components/PhotoItem';
import NewPhoto from '../components/NewPhoto';

const Photos: React.FC = () => {
  const { aid } = useParams();

  if (!aid) return null;

  const {
    isLoading,
    isError,
    data: album,
    error,
  } = useQuery<AlbumType, Error>(['albumData', aid], async () => {
    const album = await getAlbumById(aid);
    return album;
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Fragment>
      <Link to="/admin">Home</Link>
      {album && (
        <Fragment>
          {album.title}
          {album.photos.map((photo) => (
            <PhotoItem key={photo.id} photo={photo} aid={aid} />
          ))}
        </Fragment>
      )}
      <NewPhoto aid={aid} />
    </Fragment>
  );
};

export default Photos;
