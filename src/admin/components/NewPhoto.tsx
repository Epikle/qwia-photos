import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '../../shared/components/Form/Button';
import { fetchNewPhoto } from '../util/fetch';

import styles from './NewPhoto.module.scss';

const NewPhoto: React.FC<{ albumId: string }> = ({ albumId }) => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState('');
  const photoInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);

  const newPhotoMutation = useMutation(
    async (formData: FormData) => {
      const accessToken = await getAccessTokenSilently();
      console.log(formData, accessToken);
      // await fetchNewPhoto(albumId, formData, accessToken);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['albumData', albumId]);
      },
    },
  );

  const newPhotoSubmitHandler = async (
    event: React.ChangeEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !file ||
      !titleInput.current ||
      !photoInput.current ||
      titleInput.current.value.trim() === ''
    ) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', titleInput.current.value);
      formData.append('photo', file);

      // newPhotoMutation.mutate(formData);

      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/v2/qwia-photos/media/${albumId}?filetype=image/jpeg`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const responseData = await response.json();

      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
    titleInput.current.value = '';
    photoInput.current.value = '';
    setFile(undefined);
    setFileUrl('');
  };

  const imgInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length === 1) {
      setFile(event.target.files[0]);
      setFileUrl(URL.createObjectURL(event.target.files[0]));
      return;
    }
    setFile(undefined);
    setFileUrl('');
  };

  useEffect(() => {
    return () => {
      fileUrl && URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  return (
    <form onSubmit={newPhotoSubmitHandler} className={styles['new-photo']}>
      <label htmlFor="photo-img">Photo</label>
      <input
        ref={photoInput}
        type="file"
        id="photo-img"
        accept="image/png, image/gif, image/jpeg"
        onChange={imgInputChangeHandler}
        required
      />
      <label htmlFor="photo-title">Photo Title</label>
      <input type="text" id="photo-title" ref={titleInput} required />
      <Button>Add Photo</Button>
      {fileUrl && <img src={fileUrl} alt="preview" />}
    </form>
  );
};

export default NewPhoto;
