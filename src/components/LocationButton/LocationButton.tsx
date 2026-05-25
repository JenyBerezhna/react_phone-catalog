import { Link } from 'react-router-dom';
import styles from './LocationButton.module.scss';

interface LocationButtonProps {
  to?: string;
  text: string;
}

export const LocationButton = ({ to = '/', text }: LocationButtonProps) => {
  return (
    <Link to={to} className={styles.locationButton}>
      <img className={styles.homeIcon} src="/img/icons/Home.svg" alt="" />

      <img
        className={styles.arrowIcon}
        src="/img/icons/ArrowRight.svg"
        alt=""
      />

      <span className={styles.text}>{text}</span>
    </Link>
  );
};
