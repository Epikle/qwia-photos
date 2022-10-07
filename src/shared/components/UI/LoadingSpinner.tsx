import styles from './LoadingSpinner.module.scss';

const LoadingSpinner: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.spinner}>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default LoadingSpinner;
