import { Fragment, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Album as AlbumType, NewData } from '../../shared/util/types';
import { deleteAlbum, getAlbumById, patchAlbum } from '../../shared/util/fetch';
import PhotoItem from '../components/PhotoItem';
import NewPhoto from '../components/NewPhoto';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import Button from '../../shared/components/Form/Button';
import { useAuth0 } from '@auth0/auth0-react';

const Photos: React.FC = () => {
  const { aid } = useParams() as { aid: string };

  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const [published, setPublished] = useState(false);
  const [newTitle, setNewTitle] = useState(false);
  const newTitleInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: album,
    error,
  } = useQuery<AlbumType, Error>(
    ['albumData', aid],
    getAlbumById.bind(null, aid),
  );

  const deleteAlbumMutate = useMutation(
    async () => {
      const accessToken = await getAccessTokenSilently();
      await deleteAlbum(aid, accessToken);
    },
    {
      onSuccess: () => {
        navigate('/admin');
        queryClient.invalidateQueries(['albumsData']);
      },
    },
  );

  const mutateAlbumData = useMutation(
    async (newData: NewData) => {
      const accessToken = await getAccessTokenSilently();
      await patchAlbum(newData, aid, accessToken);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['albumsData']);
        queryClient.invalidateQueries(['albumData', aid]);
      },
    },
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error: {error.message}</p>;

  const changeVisibilityBtnHandler = () => {
    mutateAlbumData.mutate({ title: album.title, isPublished: !published });
    setPublished((prevState) => !prevState);
  };

  const deleteAlbumBtnHandler = () => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      deleteAlbumMutate.mutate();
    }
  };

  const editAlbumTitleBtnHandler = () => {
    if (
      newTitle &&
      newTitleInput.current &&
      newTitleInput.current?.value !== album.title &&
      newTitleInput.current?.value.trim() !== ''
    ) {
      mutateAlbumData.mutate({
        title: newTitleInput.current.value,
        isPublished: album.isPublished,
      });
    }
    setNewTitle((prevState) => !prevState);
  };

  return (
    <Fragment>
      {album && (
        <Fragment>
          {newTitle ? (
            <input defaultValue={album.title} type="text" ref={newTitleInput} />
          ) : (
            album.title
          )}
          <div>
            <Button onClick={deleteAlbumBtnHandler}>Delete</Button>
            {' | '}
            <Button
              onClick={changeVisibilityBtnHandler}
              disabled={!album.totalPhotos}
            >
              {published ? 'Hide' : 'Publish'}
            </Button>
            {' | '}
            <Button onClick={editAlbumTitleBtnHandler}>
              {newTitle ? 'Save Title' : 'Edit Title'}
            </Button>
          </div>
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
