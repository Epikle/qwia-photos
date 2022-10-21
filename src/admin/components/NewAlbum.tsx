import { useRef } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '../../shared/components/Form/Button';
import { postNewAlbum } from '../../shared/util/fetch';

import styles from './NewAlbum.module.scss';

const NewAlbum: React.FC = () => {
  const albumTitle = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const newAlbumMutation = useMutation(
    async (title: string) => {
      const accessToken = await getAccessTokenSilently();
      await postNewAlbum(title, accessToken);
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
    <form onSubmit={formSubmitHandler} className={styles.form}>
      <label htmlFor="new-album">Create new album</label>
      <input
        type="text"
        ref={albumTitle}
        id="new-album"
        placeholder="Album title"
        required
      />
      <Button>Create</Button>
    </form>
  );
};

export default NewAlbum;
