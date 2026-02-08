import styles from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
};

export const Button = ({ children, variant = 'primary', onClick }: Props) => (
  <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
    {children}
  </button>
);
