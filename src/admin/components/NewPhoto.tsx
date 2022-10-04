import React, { useState, useEffect, useRef } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import Button from '../../shared/components/Form/Button';
import { postNewPhoto } from '../util/fetch';

import styles from './NewPhoto.module.scss';

const NewPhoto: React.FC<{ albumId: string }> = ({ albumId }) => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState('');
  const [title, setTitle] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const newPhotoMutation = useMutation(
    async ({
      title,
      key,
      accessToken,
    }: {
      title: string;
      key: string;
      accessToken: string;
    }) => {
      await postNewPhoto(albumId, title, key, accessToken);
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

    if (title.trim() === '' || !file || !fileInput.current?.value) return;

    try {
      const accessToken = await getAccessTokenSilently();
      const fileType = encodeURIComponent(file.type);

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/v2/qwia-photos/media/${albumId}?filetype=${fileType}`,
        config,
      );
      const { uploadUrl, key }: { uploadUrl: string; key: string } = data;

      //upload to S3
      await axios.put(uploadUrl, file);

      newPhotoMutation.mutate({ title, key, accessToken });
    } catch (error) {
      console.log(error);
    }

    fileInput.current.value = '';
    setTitle('');
    setFileUrl('');
    setFile(undefined);
  };

  const imgInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.currentTarget.files && event.currentTarget.files.length === 1) {
      setFile(event.currentTarget.files[0]);
      setFileUrl(URL.createObjectURL(event.currentTarget.files[0]));
      return;
    }
    setFileUrl('');
    setFile(undefined);
  };

  const titleInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(event.currentTarget.value);
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
        type="file"
        id="photo-img"
        accept="image/png, image/gif, image/jpeg"
        onChange={imgInputChangeHandler}
        ref={fileInput}
        required
      />
      <label htmlFor="photo-title">Photo Title</label>
      <input
        value={title}
        type="text"
        id="photo-title"
        onChange={titleInputChangeHandler}
        required
      />
      <Button>Add Photo</Button>
      {fileUrl && <img src={fileUrl} alt="preview" />}
    </form>
  );
};

export default NewPhoto;
