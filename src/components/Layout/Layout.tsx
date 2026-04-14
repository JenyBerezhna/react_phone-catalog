import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './Layout.module.scss';

export const Layout = () => (
  <>
    <Header />

    <main className={styles.main}>
      <Outlet />
    </main>

    <Footer />
  </>
);
