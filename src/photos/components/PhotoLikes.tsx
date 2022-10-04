import { useState, useEffect, MouseEvent } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Button from '../../shared/components/Form/Button';

import styles from './PhotoLikes.module.scss';

type Props = {
  imgId: string;
  likes: [number, boolean];
  albumId: string;
};

const PhotoLikes: React.FC<Props> = ({ imgId, likes, albumId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const queryClient = useQueryClient();

  const deleteLikeMutation = useMutation(
    (visitorId: string) =>
      fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/v2/qwia-photos/photo/like/${imgId}?lid=${visitorId}`,
        {
          method: 'DELETE',
        },
      ),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(['albumData', albumId]);
      },
    },
  );
  const addLikeMutation = useMutation(
    (visitorId: string) =>
      fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/v2/qwia-photos/photo/like/${imgId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lid: visitorId,
          }),
        },
      ),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(['albumData', albumId]);
      },
    },
  );

  useEffect(() => {
    localStorage.getItem('qp-id') || localStorage.setItem('qp-id', nanoid());
    setLikesCount(likes[0]);
    setIsLiked(likes[1]);
  }, []);

  const likedBtnHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.blur();
    const getVisitorId = localStorage.getItem('qp-id');
    if (!getVisitorId) return;

    if (likes[1]) {
      deleteLikeMutation.mutate(getVisitorId);
      setIsLiked(false);
      setLikesCount((prevState) => --prevState);
      return;
    }

    addLikeMutation.mutate(getVisitorId);
    setIsLiked(true);
    setLikesCount((prevState) => ++prevState);
  };

  return (
    <div className={styles.photo__likes}>
      {likesCount > 0 && (
        <span className={styles['photo__likes-number']}>{likesCount}</span>
      )}
      <Button
        onClick={likedBtnHandler}
        className={
          isLiked
            ? [styles['photo__likes-btn'], styles['photo__likes-btn--liked']]
            : [styles['photo__likes-btn']]
        }
      >
        <FontAwesomeIcon icon={faHeart} />
      </Button>
    </div>
  );
};

export default PhotoLikes;
