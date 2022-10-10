import styles from './LoadingSpinner.module.scss';

type Props = {
  relative?: boolean;
};

const LoadingSpinner: React.FC<Props> = ({ relative = false }) => (
  <div
    className={
      relative
        ? [styles.container, styles.relative].join(' ')
        : styles.container
    }
  >
    <div className={styles.spinner}>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default LoadingSpinner;
