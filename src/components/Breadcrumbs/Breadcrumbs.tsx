import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Crumb = {
  label: string;
  to?: string;
};

type Props = {
  items: Crumb[];
};

export const Breadcrumbs = ({ items }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <NavLink to="/" className={styles.iconButton} aria-label="Go to homepage">
        <img src="/img/icons/Home.png" alt="" />
      </NavLink>

      <button
        className={styles.iconButton}
        aria-label="Go back"
        onClick={() => navigate(-1)}
      >
        <img src="/img/icons/arrow-left.svg" alt="" />
      </button>

      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <span key={item.label} className={styles.item}>
              {item.to && !isLast ? (
                <NavLink to={item.to} className={styles.link}>
                  {item.label}
                </NavLink>
              ) : (
                <span className={styles.current}>{item.label}</span>
              )}

              {!isLast && <span className={styles.separator}>/</span>}
            </span>
          );
        })}
      </nav>
    </div>
  );
};
