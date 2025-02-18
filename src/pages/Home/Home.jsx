import styles from './Home.module.css';

export default function Home({ theme }) {
  return <div className={styles[theme]}>Home Page</div>;
}
