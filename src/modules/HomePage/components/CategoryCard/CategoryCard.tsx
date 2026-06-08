import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';

type Props = {
  title: string;
  image: string;
  link: string;
  models: number;
};

export const CategoryCard: React.FC<Props> = ({
  title,
  image,
  link,
  models,
}) => (
  <Link to={link} className={styles.card}>
    <div className={styles.imageWrapper}>
      <img src={image} alt={title} className={styles.image} />
    </div>

    <div className={styles.info}>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.models}>{models} models</span>
    </div>
  </Link>
);
