import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';

type Props = {
  title: string;
  image: string;
  link: string;
};

export const CategoryCard: React.FC<Props> = ({ title, image, link }) => (
  <Link to={link} className={styles.card}>
    <img src={image} alt={title} />
    <h3>{title}</h3>
  </Link>
);
