import { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

import { Album as AlbumType, NewData } from '../../shared/util/types';
import { deleteAlbum, getAlbumById, patchAlbum } from '../../shared/util/fetch';
import PhotoItem from '../components/PhotoItem';
import NewPhoto from '../components/NewPhoto';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import Button from '../../shared/components/Form/Button';

import styles from './Photos.module.scss';

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
  } = useQuery<AlbumType, Error>({
    queryKey: ['albumData', aid],
    queryFn: getAlbumById.bind(null, aid),
  });

  useEffect(() => {
    if (album) setPublished(album.isPublished);
  }, [album]);

  const deleteAlbumMutate = useMutation({
    mutationFn: async () => {
      navigate('/admin');
      const accessToken = await getAccessTokenSilently();
      await deleteAlbum(aid, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['albumsData'] });
    },
  });

  const mutateAlbumData = useMutation({
    mutationFn: async (newData: NewData) => {
      const accessToken = await getAccessTokenSilently();
      await patchAlbum(newData, aid, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['albumsData'] });
      queryClient.invalidateQueries({ queryKey: ['albumData', aid] });
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error: {error.message}</p>;
  if (!album) return null;

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
            <strong>{album.title}</strong>
          )}
          <div className={styles['album-controls']}>
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
          <ul className={styles['photo-list']}>
            {album.photos.map((photo) => (
              <PhotoItem key={photo.id} photo={photo} aid={aid} />
            ))}
          </ul>
        </Fragment>
      )}
      <NewPhoto aid={aid} />
    </Fragment>
  );
};

export default Photos;
