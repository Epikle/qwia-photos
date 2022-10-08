import { useEffect, useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Button from '../../shared/components/Form/Button';
import { Link } from 'react-router-dom';
import { deletePhoto, patchAlbum } from '../../shared/util/fetch';
import { NewData } from '../../shared/util/types';

import styles from './AlbumItem.module.scss';

type Props = {
  id: string;
  title: string;
  isPublished: boolean;
  totalPhotos: number;
};

const AlbumItem: React.FC<Props> = ({
  id,
  title,
  isPublished,
  totalPhotos,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const [published, setPublished] = useState(false);
  const [newTitle, setNewTitle] = useState(false);
  const newTitleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPublished(isPublished);
  }, [isPublished]);

  const deleteAlbumMutate = useMutation(
    async () => {
      const accessToken = await getAccessTokenSilently();
      await deletePhoto(id, accessToken);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['albumsData']);
      },
    },
  );

  const mutateAlbumData = useMutation(
    async (newData: NewData) => {
      const accessToken = await getAccessTokenSilently();
      await patchAlbum(newData, id, accessToken);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['albumsData']);
      },
    },
  );

  const changeVisibilityBtnHandler = () => {
    mutateAlbumData.mutate({ title, isPublished: !published });
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
      newTitleInput.current?.value !== title &&
      newTitleInput.current?.value.trim() !== ''
    ) {
      mutateAlbumData.mutate({
        title: newTitleInput.current.value,
        isPublished,
      });
    }
    setNewTitle((prevState) => !prevState);
  };

  return (
    <div className={styles.albums}>
      <div>
        {newTitle && (
          <input defaultValue={title} type="text" ref={newTitleInput} />
        )}
        {!newTitle && <Link to={`/admin/${id}`}>{title}</Link>}
      </div>
      <div>
        <Button onClick={deleteAlbumBtnHandler}>Delete</Button>
        {' | '}
        <Button onClick={changeVisibilityBtnHandler} disabled={!totalPhotos}>
          {published ? 'Hide' : 'Publish'}
        </Button>
        {' | '}
        <Button onClick={editAlbumTitleBtnHandler}>
          {newTitle ? 'Save Title' : 'Edit Title'}
        </Button>
      </div>
    </div>
  );
};

export default AlbumItem;
