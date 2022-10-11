import { ReactNode, MouseEvent } from 'react';

type Props = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  children: ReactNode;
  className?: string[];
  ariaLabel?: string;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  onClick,
  children,
  className,
  ariaLabel,
  disabled,
}) => (
  <button
    className={className && `${className.join(' ')}`}
    onClick={onClick}
    aria-label={ariaLabel}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
