import { Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './Layout.module.scss';

export const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Header />

      <main className={styles.main}>
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.pathname}
            classNames="fade"
            timeout={300}
            unmountOnExit
          >
            <div className="page-transition">
              <Outlet />
            </div>
          </CSSTransition>
        </TransitionGroup>
      </main>

      <Footer />
    </>
  );
};
