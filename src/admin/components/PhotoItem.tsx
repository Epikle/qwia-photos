import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '../../shared/components/Form/Button';
import { Photo } from '../../shared/util/types';
import { deletePhoto, patchPhoto } from '../../shared/util/fetch';

import styles from './PhotoItem.module.scss';

type Props = {
  aid: string;
  photo: Photo;
};

const PhotoItem: React.FC<Props> = ({ aid, photo }) => {
  const { id: pid, title } = photo;
  const queryClient = useQueryClient();
  const newTitleInput = useRef<HTMLInputElement>(null);
  const [newTitle, setNewTitle] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const deletePhotoMutation = useMutation({
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();
      await deletePhoto(pid, accessToken);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['albumData', aid] });
    },
  });

  const titlePhotoMutation = useMutation({
    mutationFn: async (title: string) => {
      const accessToken = await getAccessTokenSilently();
      await patchPhoto(title, pid, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['albumData', aid] });
    },
  });

  const deleteBtnHandler = () => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      deletePhotoMutation.mutate();
    }
  };

  const editPhotoTitleBtnHandler = () => {
    if (
      newTitle &&
      newTitleInput.current &&
      newTitleInput.current?.value !== title &&
      newTitleInput.current?.value.trim() !== ''
    ) {
      titlePhotoMutation.mutate(newTitleInput.current.value);
    }
    setNewTitle((prevState) => !prevState);
  };

  return (
    <li className={styles.photos}>
      <div>
        {newTitle && (
          <input
            defaultValue={title}
            type="text"
            ref={newTitleInput}
            required
          />
        )}
        {!newTitle && title}
      </div>
      <div>
        <Button onClick={deleteBtnHandler}>Delete</Button>
        {' | '}
        <Button onClick={editPhotoTitleBtnHandler}>
          {newTitle ? 'Save Title' : 'Edit Title'}
        </Button>
      </div>
    </li>
  );
};

export default PhotoItem;
