import { useState, useEffect, MouseEvent } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Button from '../../shared/components/Form/Button';
import { addLike, deleteLike } from '../../shared/util/fetch';

import styles from './PhotoLikes.module.scss';

type Props = {
  pid: string;
  aid: string;
  likes: [number, boolean];
};

const PhotoLikes: React.FC<Props> = ({ pid, aid, likes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const queryClient = useQueryClient();

  const deleteLikeMutation = useMutation(
    async (lid: string) => await deleteLike(pid, lid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['albumData', aid]);
      },
    },
  );
  const addLikeMutation = useMutation(
    async (lid: string) => await addLike(pid, lid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['albumData', aid]);
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

    if (isLiked) {
      setIsLiked(false);
      deleteLikeMutation.mutate(getVisitorId);
      setLikesCount((prevState) => --prevState);
      return;
    }

    setIsLiked(true);
    addLikeMutation.mutate(getVisitorId);
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
