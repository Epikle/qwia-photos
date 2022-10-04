import { useRef } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '../../shared/components/Form/Button';
import { fetchNewAlbum } from '../util/fetch';

const NewAlbum: React.FC = () => {
  const albumTitle = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const newAlbumMutation = useMutation(
    async (title: string) => {
      const accessToken = await getAccessTokenSilently();
      await fetchNewAlbum(title, accessToken);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['albumsData']);
      },
    },
  );

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!albumTitle.current || albumTitle.current.value.trim() === '') {
      return;
    }

    newAlbumMutation.mutate(albumTitle.current.value);
    albumTitle.current.value = '';
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <input type="text" ref={albumTitle} required />{' '}
      <Button>Add new album</Button>
    </form>
  );
};

export default NewAlbum;
