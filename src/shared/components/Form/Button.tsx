import { ReactNode, MouseEvent } from 'react';

import styles from './Button.module.scss';

type Props = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  children: ReactNode;
  className?: string[];
  ariaLabel?: string;
};

const Button: React.FC<Props> = ({
  onClick,
  children,
  className,
  ariaLabel,
}) => (
  <button
    className={className ? `${styles.btn} ${className.join(' ')}` : styles.btn}
    onClick={onClick}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default Button;
