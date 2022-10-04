import { useEffect, useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Button from '../../shared/components/Form/Button';
import { Link } from 'react-router-dom';

type Props = {
  id: string;
  title: string;
  isPublished: boolean;
};

type NewData = {
  title?: string;
  isPublished?: boolean;
};

const AlbumItem: React.FC<Props> = ({ id, title, isPublished }) => {
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
      await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/v2/qwia-photos/album/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
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
      await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/v2/qwia-photos/album/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newData),
        },
      );
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
      mutateAlbumData.mutate({ title: newTitleInput.current.value });
    }
    setNewTitle((prevState) => !prevState);
  };

  return (
    <div>
      {newTitle && (
        <input defaultValue={title} type="text" ref={newTitleInput} />
      )}
      {!newTitle && <Link to={`/admin/${id}`}>{title}</Link>}
      {' ######## '}
      <Button onClick={deleteAlbumBtnHandler}>Delete</Button>
      {' | '}
      <Button onClick={changeVisibilityBtnHandler}>
        {published ? 'Hide' : 'Publish'}
      </Button>
      {' | '}
      <Button onClick={editAlbumTitleBtnHandler}>
        {newTitle ? 'Save Title' : 'Edit Title'}
      </Button>
    </div>
  );
};

export default AlbumItem;
