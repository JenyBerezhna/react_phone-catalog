import { Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useRef } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './Layout.module.scss';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { useBreadcrumbs } from '../../shared/helpers/useBreadcrumbs';

export const Layout = () => {
  const location = useLocation();
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const items = useBreadcrumbs();

  return (
    <>
      <Header />

      <main className={styles.main}>
        {location.pathname !== '/' && <Breadcrumbs items={items} />}

        <TransitionGroup component={null}>
          <CSSTransition
            key={location.pathname}
            timeout={300}
            classNames="slide-fade"
            unmountOnExit
            nodeRef={nodeRef}
          >
            <div ref={nodeRef} className="page-transition">
              <Outlet />
            </div>
          </CSSTransition>
        </TransitionGroup>
      </main>

      <Footer />
    </>
  );
};
